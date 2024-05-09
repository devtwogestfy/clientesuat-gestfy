import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
 
// Definición del componente Funcional
// eslint-disable-next-line react/prop-types
function Acciones({ estatus, funcionOnClicDescargar}) {
  // Renderizado del componente
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <IconButton onClick={funcionOnClicDescargar} aria-label="editar" title="Editar" color={'info'}>
        <ArrowCircleDownIcon></ArrowCircleDownIcon>
      </IconButton>
    </Box>
  );
}
 
export default Acciones;