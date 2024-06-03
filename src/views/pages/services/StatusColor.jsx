import { Box } from '@mui/system';
import React from 'react';
import { Badge } from '@mui/material';
import { FormattedMessage } from 'react-intl';

function StatusColor({ estado_id }) {
  const color =
    estado_id == 0
      ? 'success'
      : estado_id == 1
        ? 'warning'
        : estado_id == 2
          ? 'warning'
          : estado_id == 3
            ? 'error'
            : estado_id == 4
              ? 'error'
              : '';
  const name =
    estado_id == 0 ? (
      <FormattedMessage id="services.state.0" />
    ) : estado_id == 1 ? (
      <FormattedMessage id="services.state.1" />
    ) : estado_id == 2 ? (
      <FormattedMessage id="services.state.2" />
    ) : estado_id == 3 ? (
      <FormattedMessage id="services.state.3" />
    ) : estado_id == 4 ? (
      <FormattedMessage id="services.state.4" />
    ) : (
      ''
    );
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Badge badgeContent={name} color={color}></Badge>
    </Box>
  );
}

export default StatusColor;
