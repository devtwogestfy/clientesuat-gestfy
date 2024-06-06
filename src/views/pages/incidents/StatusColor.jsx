import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@mui/material';
import { useIntl } from 'react-intl';
function StatusColor({ estado_id }) {
  const intl = useIntl();
  const color = estado_id === '1' ? 'error' : estado_id === '2' ? 'warning' : estado_id === '3' ? 'success' : '';
  const name =
    estado_id === '1'
      ? intl.formatMessage({ id: 'incidents.status.open' })
      : estado_id === '2'
        ? intl.formatMessage({ id: 'incidents.status.wait' })
        : estado_id === '3'
          ? intl.formatMessage({ id: 'incidents.status.closed' })
          : '';

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
