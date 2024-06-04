import { Alert, CardContent, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import Icono from '@mui/icons-material/AccountTree';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import SaveIcon from '@mui/icons-material/Save';
import { FormattedMessage } from 'react-intl';

const isValidIP = (ip) => {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

function FormularioLan({ lanData, updateData }) {
  const [ip, setIp] = useState('');
  const [dhcpStart, setDhcpStart] = useState('');
  const [mask, setMask] = useState('');
  const [dhcpEnd, setDhcpEnd] = useState('');
  const [errors, setErrors] = useState({
    ip: '',
    dhcpStart: '',
    mask: '',
    dhcpEnd: ''
  });

  useEffect(() => {
    setIp(lanData.ip);
    setMask(lanData.mask);
    setDhcpStart(lanData.dhcpStart);
    setDhcpEnd(lanData.dhcpEnd);
  }, [lanData]);

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleDhcpDesdeChange = (event) => {
    setDhcpStart(event.target.value);
  };

  const handleMascaraChange = (event) => {
    setMascara(event.target.value);
  };

  const handleDhcpHastaChange = (event) => {
    setDhcpEnd(event.target.value);
  };

  const validate = () => {
    let temp = { ...errors };
    temp.ip = isValidIP(ip) ? '' : <FormattedMessage id="router.errors.valid_ip" />;
    temp.mask = isValidIP(mask) ? '' : <FormattedMessage id="router.errors.valid_mask" />;
    temp.dhcpStart = isValidIP(dhcpStart) ? '' : <FormattedMessage id="router.errors.valid_dhcpStart" />;
    temp.dhcpEnd = isValidIP(dhcpEnd) ? '' : <FormattedMessage id="router.errors.valid_dhcpEnd" />;
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = () => {
    if (validate()) {
      updateData('lan', { ip, mask, dhcpStart, dhcpEnd });
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
              <InputLabel htmlFor="ip">
                <FormattedMessage id="router.cards.form.ip" />
              </InputLabel>
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
              <InputLabel htmlFor="dhcp-desde">
                <FormattedMessage id="router.cards.form.dhcp_from" />
              </InputLabel>
              <OutlinedInput
                id="dhcp-desde"
                value={dhcpStart}
                onChange={handleDhcpDesdeChange}
                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                label="DHCP Desde"
                error={!!errors.dhcpStart}
              />
              {errors.dhcpStart && <p style={{ color: 'red' }}>{errors.dhcpStart}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <FormControl fullWidth sx={{ mb: 3, ml: 3, pr: 3 }}>
              <InputLabel htmlFor="mascara">
                {' '}
                <FormattedMessage id="router.cards.form.mask" />
              </InputLabel>
              <OutlinedInput
                id="mascara"
                value={mask}
                onChange={handleMascaraChange}
                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                label="Máscara"
                error={!!errors.mask}
              />
              {errors.mask && <p style={{ color: 'red' }}>{errors.mask}</p>}
            </FormControl>
            <FormControl fullWidth sx={{ ml: 3, pr: 3 }}>
              <InputLabel htmlFor="dhcp-hasta">
                {' '}
                <FormattedMessage id="router.cards.form.dhcp_to" />
              </InputLabel>
              <OutlinedInput
                id="dhcp-hasta"
                value={dhcpEnd}
                onChange={handleDhcpHastaChange}
                startAdornment={<InputAdornment position="start">*</InputAdornment>}
                label="DHCP Hasta"
                error={!!errors.dhcpEnd}
              />
              {errors.dhcpEnd && <p style={{ color: 'red' }}>{errors.dhcpEnd}</p>}
            </FormControl>
          </Grid>
        </Grid>
        <Alert sx={{ mt: 3 }} severity="warning" variant="filled">
          <FormattedMessage id="router.errors.warning_lan" />
        </Alert>
      </CardContent>
    </MainCard>
  );
}

FormularioLan.propTypes = {
  lanData: PropTypes.shape({
    ip: PropTypes.string.isRequired,
    mask: PropTypes.string.isRequired,
    dhcpStart: PropTypes.string.isRequired,
    dhcpEnd: PropTypes.string.isRequired
  }).isRequired,
  updateData: PropTypes.func.isRequired
};

export default FormularioLan;
