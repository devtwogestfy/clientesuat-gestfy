import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import InvoicesPage from 'views/pages/invoices/InvoicesPage';
import SummaryInfo from './SummaryInfo';
import GetInfoService from 'configuraciones/servicios/info-client';
import { FormattedMessage } from 'react-intl';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
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
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
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

const LastestInvoicesCard = ({ isLoading }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const openModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        setOpen(false);
    }, []);

    const [numeroFacturas, setNumeroFacturas] = useState(null);

    GetInfoService()
        .getInvoicesSummary()
        .then((summaryData) => {
            setNumeroFacturas(summaryData.numerofacturas);
        });

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <SummaryInfo total={numeroFacturas} titleId="invoices.title" color="primary" icon="receipt" />
                                    </Grid>
                                    <Grid item></Grid>
                                    <Grid item></Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                    <FormattedMessage id="dashboard.showcase_invoices.title" />
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        ...theme.typography.smallAvatar,
                                                        cursor: 'pointer',
                                                        backgroundColor: theme.palette.primary[200],
                                                        color: theme.palette.primary.dark
                                                    }}
                                                >
                                                    <ArrowDownwardIcon
                                                        fontSize="inherit"
                                                        sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                                                        onClick={openModal}
                                                    />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: theme.palette.primary[200]
                                                    }}
                                                ></Typography>
                                            </Grid>
                                        </Grid>
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
                                    <Typography variant="h3">
                                        <FormattedMessage id="invoices.title" />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            <InvoicesPage></InvoicesPage>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={handleClose} color="error">
                                <FormattedMessage id="dialogs.buttons.cancel" />
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardWrapper>
            )}
        </>
    );
};

LastestInvoicesCard.propTypes = {
    isLoading: PropTypes.bool
};

export default LastestInvoicesCard;
