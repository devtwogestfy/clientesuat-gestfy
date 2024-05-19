import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function OptionsButtons({ element, prepaidState }) {
    const buttonStyles = {
        backgroundColor: 'info.main',
        color: 'white',
        width: 120,
        height: 30,
        margin: '2px',
        '&:hover': {
            backgroundColor: 'info.dark'
        }
    };

    const navigate = useNavigate();

    const handleAddCircleClick = () => {
        navigate('/services/phone-records/');
    };

    const handleSettingsClick = () => {
        navigate('/router');
    };

    const handlePaymentsClick = () => {
        navigate('/services/prepays/');
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            {prepaidState && prepaidState === 1 && (
                <Button aria-label="editar" onClick={handleSettingsClick(element)} sx={buttonStyles}>
                    Generar prepago
                </Button>
            )}
            {prepaidState && prepaidState != 1 && (
                <>
                    <Button aria-label="editar" onClick={handleAddCircleClick} sx={buttonStyles}>
                        Pagar
                    </Button>
                    <Button aria-label="editar" onClick={handlePaymentsClick} sx={buttonStyles}>
                        Cancelar
                    </Button>
                </>
            )}
        </Box>
    );
}

export default OptionsButtons;
