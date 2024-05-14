import { Box } from '@mui/system';
import React from 'react';
import { Badge } from '@mui/material';
// Definición del componente Funcional
// eslint-disable-next-line react/prop-types
function StatusColor({ estado_id }) {
    console.log(estado_id);
    const color = estado_id == 1 ? 'error' : estado_id == 2 ? 'warning' : estado_id == 3 ? 'success' : '';
    const name = estado_id == 1 ? 'Abierta' : estado_id == 2 ? 'En Espera' : estado_id == 3 ? 'Cerrada' : '';
    // Renderizado del componente
    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Badge badgeContent={name} color={color}></Badge>
        </Box>
    );
}

export default StatusColor;
