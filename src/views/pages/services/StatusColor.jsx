import { Box } from '@mui/system';
import React from 'react';
import { Badge } from '@mui/material';
// Definición del componente Funcional
// eslint-disable-next-line react/prop-types
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
        estado_id == 0
            ? 'ACTIVO'
            : estado_id == 1
              ? 'BAJA TEMP.'
              : estado_id == 2
                ? 'PENDIENTE'
                : estado_id == 3
                  ? 'BAJA'
                  : estado_id == 4
                    ? 'IMPAGO'
                    : '';
    // Renderizado del componente
    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Badge badgeContent={name} color={color}></Badge>
        </Box>
    );
}

export default StatusColor;
