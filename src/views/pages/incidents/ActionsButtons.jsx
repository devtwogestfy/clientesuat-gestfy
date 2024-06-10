import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import React from 'react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ColorsTimeline from './ColorsTimeline';
import { useIntl } from 'react-intl';
function ActionsButtons({ notas }) {
    const intl = useIntl();
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
                            <Typography variant="h3">{intl.formatMessage({ id: 'dialogs.notes' })}</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <ColorsTimeline notas={notas} />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="error">
                    {intl.formatMessage({ id: 'router.buttons.close' })}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

ActionsButtons.propTypes = {
    notas: PropTypes.string
};

export default ActionsButtons;
