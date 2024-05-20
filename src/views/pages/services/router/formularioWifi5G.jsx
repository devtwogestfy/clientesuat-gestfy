import { Button, CardContent, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import WifiIcon from '@mui/icons-material/NetworkCheck';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';
import QrCodeIcon from '@mui/icons-material/QrCode';

function FormularioWifi5G() {
    return (
        <MainCard
            content={false}
            title={
                <>
                    <WifiIcon /> WiFi 5GHz
                </>
            }
            secondary={<CardSecondaryAction title="Actualizar" color="primary" icon={<SaveIcon fontSize="small" />} />}
        >
            <CardContent>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">SSID</InputLabel>
                    <OutlinedInput id="card-ssid-5g" startAdornment={<InputAdornment position="start">*</InputAdornment>} label="SSID" />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Contraseña</InputLabel>
                    <OutlinedInput
                        id="password-5g"
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

export default FormularioWifi5G;
