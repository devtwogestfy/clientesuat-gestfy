import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import NumberInputBasic from './NaturalNumberInput';

// eslint-disable-next-line react/prop-types
function OptionsButtons({ element, prepaidState }) {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [days, setDays] = useState();
    const [weeks, setWeeks] = useState();
    const [months, setMonths] = useState();

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

    const handleChange = (id) => (event) => {
        const newValue = event.target.value;
        if (id === 'days') {
            setDays(newValue);
        }

        if (id === 'weeks') {
            setWeeks(newValue);
        }

        if (id === 'months') {
            setMonths(newValue);
        }

        if (id === 'selectedDate') {
            setSelectedDate(newValue);
        }

        console.log(element);
    };

    const calculatePrice = () => {
        let brutoDia = 0;
        let brutoSemana = 0;
        let brutoMes = 0;
        let calculation = days * brutoDia + weeks * brutoSemana + months * brutoMes;
        let brutoEstimado = Math.round((calculation + Number.EPSILON) * 100) / 100;
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            {prepaidState && prepaidState === 1 && (
                <Button aria-label="editar" onClick={handleOpenCreatePrepaid} sx={buttonStyles}>
                    Generar prepago
                </Button>
            )}
            {prepaidState && prepaidState != 1 && (
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
                                <NumberInputBasic id="days" label="Días" value={days} onChange={handleChange('days')} />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <NumberInputBasic id="weeks" label="Semanas" value={weeks} onChange={handleChange('weeks')} />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <NumberInputBasic id="months" label="Meses" value={months} onChange={handleChange('months')} />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="error">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default OptionsButtons;
