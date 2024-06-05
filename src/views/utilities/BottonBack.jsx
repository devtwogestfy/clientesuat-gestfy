import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button variant="contained" onClick={() => navigate(-1)} >
            Volver
        </Button>
    );
};

export default BackButton;
