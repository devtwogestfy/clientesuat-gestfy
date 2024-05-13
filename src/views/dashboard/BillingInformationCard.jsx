import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import { IconUser } from '@tabler/icons-react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FormattedMessage } from 'react-intl';
import { backendAPI } from 'configuraciones/app';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
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
        background: theme.palette.secondary[800],
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

const BillingInformationCard = ({ isLoading }) => {
    const theme = useTheme();
    const [showData, setShowData] = useState(false);
    const [clienteInfo, setClienteInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = new Promise((resolve, reject) => {
                    backendAPI
                        .get('/appclientes/cliente')
                        .then(function (response) {
                            const data = response.data;
                            setClienteInfo(data);
                            resolve(response);
                        })
                        .catch(function (error) {
                            reject(error.response);
                        });
                });
                if (!response) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleToggleData = () => {
        setShowData((prev) => !prev);
    };

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
                                                backgroundColor: theme.palette.secondary[800],
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <IconUser fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            <FormattedMessage id="dashboard.showcase_info.title" />
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                ...theme.typography.smallAvatar,
                                                backgroundColor: theme.palette.secondary[200],
                                                color: theme.palette.secondary.dark
                                            }}
                                            onClick={handleToggleData}
                                        >
                                            {showData ? (
                                                <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                            ) : (
                                                <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                            )}
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {showData && (
                                <Grid item>
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                        <b>Nombre:</b> {clienteInfo.nombre} {clienteInfo.apellido}
                                    </Typography>
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                        <b>Dirección:</b> {clienteInfo.direccion}
                                    </Typography>
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                        <b>Teléfonos:</b> {clienteInfo.tel1}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

BillingInformationCard.propTypes = {
    isLoading: PropTypes.bool
};

export default BillingInformationCard;
