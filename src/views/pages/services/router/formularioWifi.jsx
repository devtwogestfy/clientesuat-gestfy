import React, { useState } from 'react';
import { Button, Stack, CardContent, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import WifiIcon from '@mui/icons-material/Wifi';
import SaveIcon from '@mui/icons-material/Save';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
function FormularioWifi({ updateData }) {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');

    const handleSsidChange = (event) => {
        setSsid(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        updateData('wifi24', { ssid, password });
    };

    return (
        <MainCard
            content={false}
            title={
                <>
                    <WifiIcon /> WiFi 2.4GHz
                </>
            }
            onClick={handleSubmit}
            secondary={<CardSecondaryAction title="Actualizar" color="primary" icon={<SaveIcon fontSize="small" />} />}
        >
            <CardContent>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="card-ssid">SSID</InputLabel>
                    <OutlinedInput
                        id="card-ssid"
                        value={ssid}
                        onChange={handleSsidChange}
                        startAdornment={<InputAdornment position="start">*</InputAdornment>}
                        label="SSID"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <OutlinedInput
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        startAdornment={<InputAdornment position="start">*</InputAdornment>}
                        label="Contraseña"
                    />
                </FormControl>
                <Stack sx={{ alignItems: 'center' }}>
                    <Button variant="contained" endIcon={<QrCodeIcon />}>
                        Ver Qr
                    </Button>
                </Stack>
            </CardContent>
        </MainCard>
    );
}

FormularioWifi.propTypes = {
    updateData: PropTypes.func.isRequired
};

export default FormularioWifi;
