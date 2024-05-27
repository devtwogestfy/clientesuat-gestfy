import { Button, CardContent, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import WifiIcon from '@mui/icons-material/NetworkCheck';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';
import QrCodeIcon from '@mui/icons-material/QrCode';

function FormularioWifi5G({ wifi5Data, updateData }) {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [ssidError, setSsidError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        setSsid(wifi5Data.ssid);
        setPassword(wifi5Data.password);
    }, [wifi5Data]);

    const validateSsid = (value) => {
        if (value.length < 8 || value.length > 25) {
            setSsidError('SSID must be between 8 and 25 characters');
        } else {
            setSsidError('');
        }
    };

    const validatePassword = (value) => {
        if (value.length < 8 || value.length > 25) {
            setPasswordError('Password must be between 8 and 25 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleSsidChange = (event) => {
        setSsid(event.target.value);
        validateSsid(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        validatePassword(event.target.value);
    };

    const handleSubmit = () => {
        validateSsid(ssid);
        validatePassword(password);

        if (!ssidError && !passwordError) {
            updateData('wifi5', { ssid, password });
        }
    };
    return (
        <MainCard
            content={false}
            title={
                <>
                    <WifiIcon /> WiFi 5GHz
                </>
            }
            onClick={handleSubmit}
            secondary={<CardSecondaryAction title="Actualizar" color="primary" icon={<SaveIcon fontSize="small" />} />}
        >
            <CardContent>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">SSID</InputLabel>
                    <OutlinedInput
                        id="card-ssid-5g"
                        value={ssid}
                        onChange={handleSsidChange}
                        startAdornment={<InputAdornment position="start">*</InputAdornment>}
                        label="SSID"
                    />
                    {ssidError && <FormHelperText error>{ssidError}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Contraseña</InputLabel>
                    <OutlinedInput
                        id="password-5g"
                        value={password}
                        onChange={handlePasswordChange}
                        startAdornment={<InputAdornment position="start">*</InputAdornment>}
                        label="Contraseña"
                    />
                    {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
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

FormularioWifi5G.propTypes = {
    wifi5Data: PropTypes.shape({
        ssid: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    updateData: PropTypes.func.isRequired
};

export default FormularioWifi5G;
