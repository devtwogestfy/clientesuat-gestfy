import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@mui/material';

function StatusColor({ estado_id }) {
  const color = estado_id === '1' ? 'error' : estado_id === '2' ? 'warning' : estado_id === '3' ? 'success' : '';
  const name = estado_id === '1' ? 'Abierta' : estado_id === '2' ? 'En Espera' : estado_id === '3' ? 'Cerrada' : '';

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Badge badgeContent={name} color={color}></Badge>
    </Box>
  );
}

StatusColor.propTypes = {
  estado_id: PropTypes.string
};

export default StatusColor;
