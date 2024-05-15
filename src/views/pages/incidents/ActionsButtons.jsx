import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import React from 'react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ColorsTimeline from './ColorsTimeline';

// Definición del componente Funcional
// eslint-disable-next-line react/prop-types
function ActionsButtons({ notas }) {
    // Renderizado del componente
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton
                    onClick={() => {
                        openModal(notas);
                    }}
                    aria-label="editar"
                    title="Editar"
                    color={'info'}
                >
                    <VisibilityRoundedIcon></VisibilityRoundedIcon>
                </IconButton>
            </Box>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseIcon />
                    </IconButton>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Typography variant="h3">Notas</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <ColorsTimeline notas={notas} />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="error">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ActionsButtons;
