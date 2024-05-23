import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import PropTypes from 'prop-types';

function Actions({ funcionOnClicDescargar, factura_id }) {
    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <IconButton
                onClick={() => {
                    funcionOnClicDescargar(factura_id);
                }}
                aria-label="Descargar"
                title="Descargar"
                color={'info'}
            >
                <ArrowCircleDownIcon></ArrowCircleDownIcon>
            </IconButton>
        </Box>
    );
}

Actions.propTypes = {
    funcionOnClicDescargar: PropTypes.func.isRequired,
    factura_id: PropTypes.number.isRequired
};
export default Actions;
