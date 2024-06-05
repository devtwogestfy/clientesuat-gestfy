import React, { useEffect, useState } from 'react';
import {
  Button,
  Stack,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import WifiIcon from '@mui/icons-material/Wifi';
import SaveIcon from '@mui/icons-material/Save';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import QRCode from 'qrcode.react';
import { FormattedMessage } from 'react-intl';

function FormularioWifi({ wifi24Data, updateData }) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ssidError, setSsidError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSsid(wifi24Data.ssid);
    setPassword(wifi24Data.password);
  }, [wifi24Data]);

  const validateSsid = (value) => {
    if (value.length < 8 || value.length > 25) {
      setSsidError(<FormattedMessage id="router.errors.valid_ssid" />);
    } else {
      setSsidError('');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8 || value.length > 25) {
      setPasswordError(<FormattedMessage id="router.errors.valid_password" />);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
    validateSsid(ssid);
    validatePassword(password);

    if (!ssidError && !passwordError) {
      updateData('wifi24', { ssid, password });
    }
  };

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
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
            error={!!ssidError}
          />
          {ssidError && <FormHelperText error>{ssidError}</FormHelperText>}
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="password">
            <FormattedMessage id="router.cards.form.password" />
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            startAdornment={<InputAdornment position="start">*</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
            error={!!passwordError}
          />
          {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
        </FormControl>
        <Stack sx={{ alignItems: 'center', mt: 4 }}>
          <Button variant="contained" endIcon={<QrCodeIcon />} onClick={handleClickOpen}>
            <FormattedMessage id="router.buttons.qr24" />
          </Button>
        </Stack>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <WifiIcon /> <FormattedMessage id="router.buttons.qr24" />
        </DialogTitle>
        <DialogContent>
          <QRCode value={`WIFI:T:WPA;S:${ssid};P:${password};;`} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}

FormularioWifi.propTypes = {
  wifi24Data: PropTypes.shape({
    ssid: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  updateData: PropTypes.func.isRequired
};

export default FormularioWifi;
