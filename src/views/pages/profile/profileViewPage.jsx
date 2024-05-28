import { useState, useEffect } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
    Box,
    Stack,
    Button,
    Grid,
    Tabs,
    Tab
} from '@mui/material';
import ProfileBackground from 'assets/images/banner.png';
import ProfileImage from 'assets/images/users/user-round.svg';
import MainCard from 'ui-component/cards/MainCard';
import HomeIcono from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import ServiceTabPanel from './ServiceTabPanel';
import InvoiceTabPanel from './InvoiceTabPanel';
import IncidentTabPanel from './IncidentTabPanel';
import ClientTabPanel from './ClientTabPanel';
import GetInfoClient from 'configuraciones/servicios/client';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function CustomTabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProfileViewPage = () => {
    const [value, setValue] = useState(0);
    const [clientInfo, setClientInfo] = useState(null);

    const infoClient = GetInfoClient();
    const fetchData = async () => {
        try {
            infoClient.getClient().then((client) => {
                setClientInfo(client);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Box position="relative">
                <Card>
                    <CardActionArea>
                        <CardMedia component="img" height="240" image={ProfileBackground} sx={{ borderRadius: '10px' }} />
                        <Box position="absolute" top="120px" left="16px" zIndex={1}>
                            <Avatar
                                src={ProfileImage}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    border: '2px solid white',
                                    boxShadow: 2
                                }}
                            />
                        </Box>
                    </CardActionArea>
                    <CardContent sx={{ pt: '60px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8} md={6}>
                                <Typography gutterBottom variant="h2" component="div">
                                   {clientInfo && clientInfo ? `${clientInfo.nombre} ${clientInfo.apellido}` : '-'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={6} container justifyContent="flex-end">
                                <Stack direction="row" spacing={2}>
                                    <Button component={Link} to="/" variant="outlined" startIcon={<HomeIcono />}>
                                        Inicio
                                    </Button>
                                    <Button component={Link} to="/incidents" variant="contained" endIcon={<SendIcon />}>
                                        Nueva Incidencia
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Datos" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                        <Tab label="Servicios" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                        <Tab label="Facturas" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                        <Tab label="Incidencias" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <ClientTabPanel  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                   <ServiceTabPanel  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <InvoiceTabPanel  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                     <IncidentTabPanel  />
                </CustomTabPanel>
            </Box>
        </MainCard>
    );
};

export default ProfileViewPage;
