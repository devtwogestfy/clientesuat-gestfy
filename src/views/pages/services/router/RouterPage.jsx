/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// project imports
import { gridSpacing } from 'store/constant';
import { styled, useTheme } from '@mui/system';

const FormGrid = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column'
}));

const ColorBox = ({ bgcolor, title, data, dark }) => (
    <>
        <Card sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor,
                    color: dark ? 'grey.800' : '#ffffff'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" color="inherit">
                        {title}
                    </Typography>
                )}
                {!title && <Box sx={{ p: 1.15 }} />}
            </Box>
        </Card>
        {data && (
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle2">{data.label}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        {data.color}
                    </Typography>
                </Grid>
            </Grid>
        )}
    </>
);

ColorBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool
};

const RouterPage = () => {
    const theme = useTheme();

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 3,
                                        height: { xs: 300, sm: 350, md: 175 },
                                        width: '100%',
                                        borderRadius: '20px',
                                        border: '1px solid ',
                                        borderColor: 'divider',
                                        backgroundColor: theme.palette.background.paper,
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>WiFi 2.4GHz</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            gap: 2
                                        }}
                                    >
                                        <FormGrid sx={{ flexGrow: 1 }}>
                                            <FormLabel htmlFor="card-ssid" required>
                                                SSID
                                            </FormLabel>
                                            <OutlinedInput id="card-ssid" autoComplete="card-ssid" placeholder="SSID" required />
                                        </FormGrid>
                                        <FormGrid sx={{ maxWidth: '60%' }}>
                                            <FormLabel htmlFor="password" required>
                                                Contraseña
                                            </FormLabel>
                                            <OutlinedInput id="password" autoComplete="password" placeholder="Contraseña" required />
                                        </FormGrid>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            gap: 2
                                        }}
                                    ></Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 3,
                                        height: { xs: 300, sm: 350, md: 175 },
                                        width: '100%',
                                        borderRadius: '20px',
                                        border: '1px solid ',
                                        borderColor: 'divider',
                                        backgroundColor: theme.palette.background.paper,
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>WiFi 5GHz</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            gap: 2
                                        }}
                                    >
                                        <FormGrid sx={{ flexGrow: 1 }}>
                                            <FormLabel htmlFor="card-ssid" required>
                                                SSID
                                            </FormLabel>
                                            <OutlinedInput id="card-ssid" autoComplete="card-ssid" placeholder="SSID" required />
                                        </FormGrid>
                                        <FormGrid sx={{ maxWidth: '60%' }}>
                                            <FormLabel htmlFor="password" required>
                                                Contraseña
                                            </FormLabel>
                                            <OutlinedInput id="password" autoComplete="password" placeholder="Contraseña" required />
                                        </FormGrid>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            gap: 2
                                        }}
                                    ></Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 3,
                                        height: { xs: 300, sm: 350, md: 250 },
                                        width: '100%',
                                        borderRadius: '20px',
                                        border: '1px solid ',
                                        borderColor: 'divider',
                                        backgroundColor: theme.palette.background.paper,
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>LAN</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            gap: 2
                                        }}
                                    >
                                        <FormGrid sx={{ flexGrow: 1 }}>
                                            <FormLabel htmlFor="card-ssid" required>
                                                SSID
                                            </FormLabel>
                                            <OutlinedInput id="card-ssid" autoComplete="card-ssid" placeholder="SSID" required />
                                        </FormGrid>
                                        <FormGrid sx={{ flexGrow: 1 }}>
                                            <FormLabel htmlFor="password" required>
                                                Contraseña
                                            </FormLabel>
                                            <OutlinedInput id="password" autoComplete="password" placeholder="Contraseña" required />
                                        </FormGrid>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            gap: 2
                                        }}
                                    >
                                        <FormGrid sx={{ flexGrow: 1 }}>
                                            <FormLabel htmlFor="card-ssid" required>
                                                SSID
                                            </FormLabel>
                                            <OutlinedInput id="card-ssid" autoComplete="card-ssid" placeholder="SSID" required />
                                        </FormGrid>
                                        <FormGrid sx={{ flexGrow: 1 }}>
                                            <FormLabel htmlFor="password" required>
                                                Contraseña
                                            </FormLabel>
                                            <OutlinedInput id="password" autoComplete="password" placeholder="Contraseña" required />
                                        </FormGrid>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            gap: 2
                                        }}
                                    ></Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}></Grid>
            </Grid>
        </>
    );
};

export default RouterPage;
