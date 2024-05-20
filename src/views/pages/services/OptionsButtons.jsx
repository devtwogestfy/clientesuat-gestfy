import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slider, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
  import { styled } from '@mui/system';

// eslint-disable-next-line react/prop-types
function OptionsButtons({ element, prepaidState }) {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(dayjs());
    console.log(element);
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
       console.log(id);
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
                                            label="Fecha desde"
                                            value={startDate}
                                            onChange={(newValue) => handleDateChange(newValue, true)}
                                            format="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} sx={{ margin: 0 }} />}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0} // Valor mínimo
                max={100} // Valor máximo
            />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0} // Valor mínimo
                max={100} // Valor máximo
            />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Slider
                value=
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0} // Valor mínimo
                max={100} // Valor máximo
            />
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
