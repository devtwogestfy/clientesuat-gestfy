import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ActionsButtons({ service_id, tipo }) {
    const navigate = useNavigate();

    const handleAddCircleClick = () => {
        navigate('/phone-records', tipo + '-' + service_id);
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <IconButton aria-label="editar" color={'info'}>
                <SettingsIcon></SettingsIcon>
            </IconButton>
            <IconButton aria-label="editar" color={'info'} onClick={handleAddCircleClick} target="_blank">
                <AddCircleRoundedIcon></AddCircleRoundedIcon>
            </IconButton>
            <IconButton aria-label="editar" color={'info'}>
                <InfoRoundedIcon></InfoRoundedIcon>
            </IconButton>
            <IconButton aria-label="editar" color={'info'}>
                <PaymentsRoundedIcon></PaymentsRoundedIcon>
            </IconButton>
        </Box>
    );
}

export default ActionsButtons;
