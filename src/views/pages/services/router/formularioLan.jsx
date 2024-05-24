import { Alert, CardContent, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import Icono from '@mui/icons-material/AccountTree';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';

function FormularioLan({ updateData }) {
    const [ip, setIp] = useState('');
    const [dhcpDesde, setDhcpDesde] = useState('');
    const [mascara, setMascara] = useState('');
    const [dhcpHasta, setDhcpHasta] = useState('');

    const handleIpChange = (event) => {
        setIp(event.target.value);
    };

    const handleDhcpDesdeChange = (event) => {
        setDhcpDesde(event.target.value);
    };

    const handleMascaraChange = (event) => {
        setMascara(event.target.value);
    };

    const handleDhcpHastaChange = (event) => {
        setDhcpHasta(event.target.value);
    };

    const handleSubmit = () => {
        updateData({ ip, dhcpDesde, mascara, dhcpHasta });
    };

    return (
        <MainCard
            content={false}
            title={
                <>
                    <Icono /> Lan
                </>
            }
            onClick={handleSubmit}
            secondary={<CardSecondaryAction title="Actualizar" color="primary" icon={<SaveIcon fontSize="small" />} />}
        >
            <CardContent>
                <Grid container spacing="2">
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">IP</InputLabel>
                            <OutlinedInput
                                id="ip"
                                value={ip}
                                onChange={handleIpChange}
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="IP"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">DHCP Desde</InputLabel>
                            <OutlinedInput
                                id="dhcp-desde"
                                value={dhcpDesde}
                                onChange={handleDhcpDesdeChange}
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
                                value={mascara}
                                onChange={handleMascaraChange}
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="Máscara"
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ ml: 3, pr: 3 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">DHCP Hasta</InputLabel>
                            <OutlinedInput
                                id="dhcp-hasta"
                                value={dhcpHasta}
                                onChange={handleDhcpHastaChange}
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="DHCP Hasta"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Alert sx={{ mt: 3 }} severity="warning" variant="filled">
                    Cambiar estos parámetros puede dejarle sin conectividad.
                </Alert>
            </CardContent>
        </MainCard>
    );
}

FormularioLan.propTypes = {
    updateData: PropTypes.func.isRequired
};
export default FormularioLan;
