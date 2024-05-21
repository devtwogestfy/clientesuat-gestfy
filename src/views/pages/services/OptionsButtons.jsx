import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Typography,
    FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

function OptionsButtons({ element }) {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [days, setDays] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [months, setMonths] = useState(0);
    const [brutoEstimado, setBrutoEstimado] = useState(0);
    const infoService = GetInfoService();

    const buttonStyles = {
        backgroundColor: 'info.main',
        color: 'white',
        width: 120,
        height: 30,
        margin: '2px',
        '&:hover': {
            backgroundColor: 'info.dark'
        }
    };

    const navigate = useNavigate();

    const handleAddCircleClick = () => {
        navigate('/services/phone-records/');
    };

    const handleOpenCreatePrepaid = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePaymentsClick = () => {
        navigate('/services/prepays/');
    };

    const handleSavePrepaid = () => {
        infoService.createPrepay(parameters).then((response) => {
            console.log(response);

            setTimeout(() => {}, 3000);
            setOpen(false);
        });
    };

    const handleChange = (id) => (event) => {
        let newValue;
        if (id === 'selectedDate') {
            newValue = event; // For DatePicker, event is the new date
            setSelectedDate(newValue);
        } else {
            newValue = Number(event.target.value); // Ensure the value is a number for numeric inputs
            if (id === 'days') {
                setDays(newValue);
            } else if (id === 'weeks') {
                setWeeks(newValue);
            } else if (id === 'months') {
                setMonths(newValue);
            }
        }
        calculatePrice();
    };

    const calculatePrice = () => {
        let brutoDia = element.brutoDia ? element.brutoDia : 1;
        let brutoSemana = element.brutoSemana ? element.brutoSemana : 1;
        let brutoMes = element.brutoMes ? element.brutoMes : 1;
        let calculation = (days || 0) * brutoDia + (weeks || 0) * brutoSemana + (months || 0) * brutoMes;
        setBrutoEstimado(Math.round((calculation + Number.EPSILON) * 100) / 100);
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            {element.prepaid && element.prepaid === 1 && (
                <Button aria-label="editar" onClick={handleOpenCreatePrepaid} sx={buttonStyles}>
                    Generar prepago
                </Button>
            )}
            {element.prepaid && element.prepaid !== 1 && (
                <>
                    <Button aria-label="editar" onClick={handleAddCircleClick} sx={buttonStyles}>
                        Pagar
                    </Button>
                    <Button aria-label="editar" onClick={handlePaymentsClick} sx={buttonStyles}>
                        Cancelar
                    </Button>
                </>
            )}
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
                                            slots={{ textField: (props) => <TextField {...props} /> }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '10px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl fullWidth>
                                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                                        Días
                                    </Typography>
                                    <NumberInputBasic id="days" value={days} onChange={handleChange('days')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl fullWidth>
                                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                                        Semanas
                                    </Typography>
                                    <NumberInputBasic id="weeks" value={weeks} onChange={handleChange('weeks')} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl fullWidth>
                                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                                        Meses
                                    </Typography>
                                    <NumberInputBasic id="months" value={months} onChange={handleChange('months')} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <TextField id="outlined-read-only-input" label="Precio (Sin IVA)" value={brutoEstimado} disabled />
                    <Button variant="outlined" onClick={handleSavePrepaid} color="success">
                        Guardar
                    </Button>
                    <Button variant="outlined" onClick={handleClose} color="error">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

OptionsButtons.propTypes = {
    element: PropTypes.shape({
        id: PropTypes.number.isRequired,
        estado: PropTypes.string.isRequired,
        tipoId: PropTypes.number.isRequired,
        aviso: PropTypes.string,
        prepaid: PropTypes.number,
        brutoDia: PropTypes.number,
        brutoSemana: PropTypes.number,
        brutoMes: PropTypes.number
    }).isRequired
};

export default OptionsButtons;
