import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ActionsButtons({ id, estado, tipoId, aviso, prepaid }) {
    const navigate = useNavigate();

    const handleAddCircleClick = () => {
        navigate('/phone-records', id);
    };

    const handleSettingsClick = () => {
        navigate('/router');
    };

    const handlePaymentsClick = () => {
        navigate('/prepays');
    };

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <IconButton aria-label="editar" color={'info'} onClick={handleSettingsClick} disabled={!!tipoId || estado !== 0}>
                <SettingsIcon></SettingsIcon>
            </IconButton>
            <IconButton aria-label="editar" color={'info'} onClick={handleAddCircleClick} disabled={!tipoId}>
                <AddCircleRoundedIcon></AddCircleRoundedIcon>
            </IconButton>
            <IconButton aria-label="editar" color={'info'} disabled={!tipoId || aviso === '0'}>
                <InfoRoundedIcon></InfoRoundedIcon>
            </IconButton>
            <IconButton aria-label="editar" color={'info'} onClick={handlePaymentsClick} disabled={prepaid != 1}>
                <PaymentsRoundedIcon></PaymentsRoundedIcon>
            </IconButton>
        </Box>
    );
}

export default ActionsButtons;
