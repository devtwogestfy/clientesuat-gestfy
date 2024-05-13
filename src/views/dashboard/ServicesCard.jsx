import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ServicesPage from 'views/pages/services/ServicesPage';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.warning.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.warning.main,
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.warning.main,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const ServicesCard = ({ isLoading }) => {
    const theme = useTheme();

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
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.warning.main,
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <SettingsIcon />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            Servicios
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                ...theme.typography.smallAvatar,
                                                backgroundColor: theme.palette.warning.main,
                                                color: theme.palette.warning.dark
                                            }}
                                        >
                                            <ArrowUpwardIcon
                                                fontSize="inherit"
                                                sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                                                onClick={openModal}
                                            />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
                        <DialogTitle>
                            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                                <CloseIcon />
                            </IconButton>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <Typography variant="h3">Servicios</Typography>
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            {/* Aquí se renderiza el formulario */}
                            <ServicesPage></ServicesPage>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={handleClose} color="error">
                                Cancelar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardWrapper>
            )}
        </>
    );
};

ServicesCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ServicesCard;
