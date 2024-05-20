import { Alert, CardContent, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Icono from '@mui/icons-material/AccountTree';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';

function FormularioLan() {
    return (
        <MainCard
            content={false}
            title={
                <>
                    <Icono /> Lan
                </>
            }
            secondary={<CardSecondaryAction title="Actualizar" color="primary" icon={<SaveIcon fontSize="small" />} />}
        >
            <CardContent>
                <Grid container spacing="2">
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">IP</InputLabel>
                            <OutlinedInput id="ip" startAdornment={<InputAdornment position="start">*</InputAdornment>} label="IP" />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">DHCP Desde</InputLabel>
                            <OutlinedInput
                                id="dhcp-desde"
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="DHCP Desde"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl fullWidth sx={{ mb: 3, ml: 3, pr: 3 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Máscara</InputLabel>
                            <OutlinedInput
                                id="mascara"
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="Máscara"
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ ml: 3, pr: 3 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">DHCP Hasta</InputLabel>
                            <OutlinedInput
                                id="dhcp-hasta"
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="DHCP Hasta"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Alert sx={{ mt: 3 }} severity="warning" variant="filled">
                    Cambiar estos parámetros puede dejarle sin conectivida.
                </Alert>
            </CardContent>
        </MainCard>
    );
}

export default FormularioLan;
