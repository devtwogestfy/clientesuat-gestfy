import { Alert, CardContent, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import Icono from '@mui/icons-material/AccountTree';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';

// Función para validar direcciones IP
const isValidIP = (ip) => {
    const ipRegex =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
};

function FormularioLan({ lanData, updateData }) {
    const [ip, setIp] = useState('');
    const [dhcpDesde, setDhcpDesde] = useState('');
    const [mascara, setMascara] = useState('');
    const [dhcpHasta, setDhcpHasta] = useState('');
    const [errors, setErrors] = useState({
        ip: '',
        dhcpDesde: '',
        mascara: '',
        dhcpHasta: ''
    });

    useEffect(() => {
        setIp(lanData.ip);
        setMascara(lanData.mascara);
        setDhcpDesde(lanData.dhcpDesde);
        setDhcpHasta(lanData.dhcpHasta);
    }, [lanData]);

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

    const validate = () => {
        let temp = { ...errors };
        temp.ip = isValidIP(ip) ? '' : 'Invalid IP address';
        temp.mascara = isValidIP(mascara) ? '' : 'Invalid Mask address';
        temp.dhcpDesde = isValidIP(dhcpDesde) ? '' : 'Invalid DHCP Start address';
        temp.dhcpHasta = isValidIP(dhcpHasta) ? '' : 'Invalid DHCP End address';
        setErrors(temp);
        console.log(temp);
        return Object.values(temp).every((x) => x === '');
    };

    const handleSubmit = () => {
        if (validate()) {
            updateData('lan', { ip, dhcpDesde, mascara, dhcpHasta });
        }
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
                            <InputLabel htmlFor="ip">IP</InputLabel>
                            <OutlinedInput
                                id="ip"
                                value={ip}
                                onChange={handleIpChange}
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="IP"
                                error={!!errors.ip}
                            />
                            {errors.ip && <p style={{ color: 'red' }}>{errors.ip}</p>}
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="dhcp-desde">DHCP Desde</InputLabel>
                            <OutlinedInput
                                id="dhcp-desde"
                                value={dhcpDesde}
                                onChange={handleDhcpDesdeChange}
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="DHCP Desde"
                                error={!!errors.dhcpDesde}
                            />
                            {errors.dhcpDesde && <p style={{ color: 'red' }}>{errors.dhcpDesde}</p>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <FormControl fullWidth sx={{ mb: 3, ml: 3, pr: 3 }}>
                            <InputLabel htmlFor="mascara">Máscara</InputLabel>
                            <OutlinedInput
                                id="mascara"
                                value={mascara}
                                onChange={handleMascaraChange}
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="Máscara"
                                error={!!errors.mascara}
                            />
                            {errors.mascara && <p style={{ color: 'red' }}>{errors.mascara}</p>}
                        </FormControl>
                        <FormControl fullWidth sx={{ ml: 3, pr: 3 }}>
                            <InputLabel htmlFor="dhcp-hasta">DHCP Hasta</InputLabel>
                            <OutlinedInput
                                id="dhcp-hasta"
                                value={dhcpHasta}
                                onChange={handleDhcpHastaChange}
                                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                                label="DHCP Hasta"
                                error={!!errors.dhcpHasta}
                            />
                            {errors.dhcpHasta && <p style={{ color: 'red' }}>{errors.dhcpHasta}</p>}
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
    lanData: PropTypes.shape({
        ip: PropTypes.string,
        mascara: PropTypes.string,
        dhcpDesde: PropTypes.string,
        dhcpHasta: PropTypes.string
    }).isRequired,
    updateData: PropTypes.func.isRequired
};

export default FormularioLan;
