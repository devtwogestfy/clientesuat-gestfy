import CircleIcon from '@mui/icons-material/Circle';
import { Box } from '@mui/system';
import React from 'react';

// Definición del componente Funcional
// eslint-disable-next-line react/prop-types
function StatusColor({ estado_id }) {
    console.log(estado_id);
    const color = estado_id == 1 ? 'error' : estado_id == 2 ? 'warning' : estado_id == 3 ? 'success' : '';
    // Renderizado del componente
    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <CircleIcon color={color}></CircleIcon>
        </Box>
    );
}

export default StatusColor;
