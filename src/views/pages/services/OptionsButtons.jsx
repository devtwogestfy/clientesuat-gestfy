import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
    FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import NumberInputBasic from './NaturalNumberInput';
import PropTypes from 'prop-types';
import GetInfoService from 'configuraciones/servicios/service';
import CancelPrepayDialog from './CancelPrepayDialog';
import CancelPrepayPopper from './CancelPrepayPopper';
import PayDialog from './../../utilities/dialogs/PayDialog';

function OptionsButtons({ element, updateData }) {
    //console.log(element);
    const [open, setOpen] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [openPay, setOpenPay] = useState(false);
    const [openPopperCancel, setOpenPopperCancel] = useState(false);
    const [contentModal, setContentModal] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [days, setDays] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [months, setMonths] = useState(0);
    const [brutoEstimado, setBrutoEstimado] = useState(0);
    const [proformaId, setProformaId] = useState(0);
    const infoService = GetInfoService();

    const handleFormalizePrepay = () => {
        const id = element.id;
        infoService.validatePrepay(id).then((response) => {
            console.log(response);
            //setOpenPay(true);
            if (response === 'ko') {
                //setAlertMessage('services.prepay.dialog.outdated');
                setOpenAlertDialog(true);
            } else {
                //setAlertMessage('dialogs.online_payments.redirection');
                setOpenPay(true);
            }
        });
    };

    const handleOpenCreatePrepaid = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelPrepay = () => {
        setOpenCancel(true);
    };

    const handleCloseCancel = () => {
        setOpenCancel(false);
    };

    const handleClosePay = (submit) => {
        setOpenPay(false);
        console.log(proformaId);
        if (submit) {
            const data = infoService.startPurchasePrepaid(147, location.href, submit).then((response) => {
                console.log(response);
                return response;
            });
            console.log(data);
            //setLoading(true);

            // Crear y enviar formulario
            /*const form = document.createElement('form');
            form.action = data.url;
            form.method = 'POST';
            form.target = '_self';
            form.style.display = 'none';

            const input1 = document.createElement('input');
            input1.type = 'hidden';
            input1.name = 'Ds_SignatureVersion';
            input1.value = data.signatureVersion;

            const input2 = document.createElement('input');
            input2.type = 'hidden';
            input2.name = 'Ds_MerchantParameters';
            input2.value = data.merchantParams;

            const input3 = document.createElement('input');
            input3.type = 'hidden';
            input3.name = 'Ds_Signature';
            input3.value = data.signature;

            const submitInput = document.createElement('input');
            submitInput.type = 'submit';

            form.appendChild(input1);
            form.appendChild(input2);
            form.appendChild(input3);
            form.appendChild(submitInput);
            document.body.appendChild(form);
            submitInput.click();

            form.remove();¨*/
        }
    };

    const handleCancelSendPrepay = () => {
        const id = element.id;
        infoService.cancelPrepay(id).then((response) => {
            setOpenPopperCancel(true);
            setContentModal(response);
            updateData();
            setTimeout(() => {
                setOpenPopperCancel(false);
                setContentModal('');
            }, 3000);
            setOpenCancel(false);
        });
    };
    const handleSavePrepaid = () => {
        const parameters = {
            dias: days,
            semanas: weeks,
            meses: months,
            fechainstalacion: dayjs(selectedDate).format('DD-MM-YYYY'),
            servId: element.id,
            servPadreId: element.intservicio_id
        };
        infoService.createPrepay(parameters).then((response) => {
            setOpenPopperCancel(true);
            setContentModal('Generado exitosamente');
            setProformaId(response.proformaId);
            console.log(response.proformaId);
            console.log(proformaId);
            updateData();
            setTimeout(() => {
                setOpenPopperCancel(false);
                setContentModal('');
            }, 3000);
            setOpen(false);
        });
    };

    const handleChange = (id) => (event) => {
        let newValue;
        if (id === 'selectedDate') {
            newValue = event;
            setSelectedDate(newValue);
        } else {
            newValue = Number(event.target.value);
            if (newValue >= 0) {
                if (id === 'days') {
                    setDays(newValue);
                } else if (id === 'weeks') {
                    setWeeks(newValue);
                } else if (id === 'months') {
                    setMonths(newValue);
                }
            }
        }
        calculatePrice();
    };

    const calculatePrice = () => {
        let brutoDia = element.brutoDia ? parseFloat(element.brutoDia) : 1;
        let brutoSemana = element.brutoSemana ? parseFloat(element.brutoSemana) : 1;
        let brutoMes = element.brutoMes ? parseFloat(element.brutoMes) : 1;
        let calculation = (days || 0) * brutoDia + (weeks || 0) * brutoSemana + (months || 0) * brutoMes;
        setBrutoEstimado(Math.round((calculation + Number.EPSILON) * 100) / 100);
    };

    const optionsServices = [{ value: 30, nombre: 'Quince días' }];

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            {element.prepaid === 1 &&
                element.prepaidActive === 1 &&
                (((!element.prepaidState || element.prepaidState !== 1) && (
                    <Button aria-label="create" onClick={handleOpenCreatePrepaid} variant="contained">
                        Generar prepago
                    </Button>
                )) ||
                    (element.prepaidState === 1 && (
                        <>
                            <Button aria-label="pay" onClick={handleFormalizePrepay} variant="contained">
                                Formalizar prepago
                            </Button>
                            <Button aria-label="cancel" onClick={handleCancelPrepay} variant="contained">
                                Cancelar prepago
                            </Button>
                        </>
                    )))}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseIcon />
                    </IconButton>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Typography variant="h3">Información de Contratación</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            id="selectedDate"
                                            label="Fecha desde"
                                            value={selectedDate}
                                            onChange={handleChange('selectedDate')}
                                            format="DD/MM/YYYY"
                                            fullWidth
                                            slots={{ textField: (props) => <TextField {...props} /> }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
                        {(element.tecnologia === 0 && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <FormControl fullWidth>
                                        <NumberInputBasic label="Días" id="days" value={days} onChange={handleChange('days')} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <FormControl fullWidth>
                                        <NumberInputBasic label="Semanas" id="weeks" value={weeks} onChange={handleChange('weeks')} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <FormControl fullWidth>
                                        <NumberInputBasic label="Meses" id="months" value={months} onChange={handleChange('months')} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )) ||
                            (element.tecnologia === 1 && (
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            onChange={handleChange('days')}
                                            sx={{ width: '100%' }}
                                            options={optionsServices.map((option) => ({ id: option.value, label: option.nombre }))}
                                            renderInput={(params) => <TextField {...params} label="Elige una opción" />}
                                            renderOption={(props, option) => {
                                                return (
                                                    <MenuItem {...props} key={option.id} value={option.id}>
                                                        {option.label}
                                                    </MenuItem>
                                                );
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <p style={{ marginRight: 'auto', marginLeft: '20px' }}>Precio (Sin IVA): {brutoEstimado} €</p>
                    <Button variant="contained" onClick={handleSavePrepaid} color="success">
                        Guardar
                    </Button>
                    <Button variant="contained" onClick={handleClose} color="error">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <CancelPrepayDialog
                openCancel={openCancel}
                handleCloseCancel={handleCloseCancel}
                handleCancelSendPrepay={handleCancelSendPrepay}
            />
            <PayDialog openPay={openPay} handleClosePay={handleClosePay} />
            <CancelPrepayPopper openPopperCancel={openPopperCancel} contentModal={contentModal} />
        </Box>
    );
}

OptionsButtons.propTypes = {
    element: PropTypes.shape({
        id: PropTypes.number.isRequired,
        estado: PropTypes.number.isRequired,
        tipoId: PropTypes.string,
        intservicio_id: PropTypes.number,
        aviso: PropTypes.string,
        prepaid: PropTypes.number,
        prepaidState: PropTypes.number,
        prepaidActive: PropTypes.number,
        tecnologia: PropTypes.number,
        brutoDia: PropTypes.string,
        brutoSemana: PropTypes.string,
        brutoMes: PropTypes.string
    }).isRequired,
    updateData: PropTypes.func.isRequired
};

export default OptionsButtons;
