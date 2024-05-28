import React from 'react';
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
    Tab,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import ProfileBackground from 'assets/images/banner.png';
import ProfileImage from 'assets/images/users/user-round.svg';
import MainCard from 'ui-component/cards/MainCard';
import HomeIcono from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ServiceTabPanel from './ServiceTabPanel';
import InvoiceTabPanel from './InvoiceTabPanel';
import IncidentTabPanel from './IncidentTabPanel';

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
    const [value, setValue] = React.useState(0);

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
                                    Kevin Duran
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={6} container justifyContent="flex-end">
                                <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" startIcon={<HomeIcono />}>
                                        Inicio
                                    </Button>
                                    <Button variant="contained" endIcon={<SendIcon />}>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <nav aria-label="main mailbox folders">
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Inbox" />
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PhoneAndroidIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Telefono" /> (+51) 934356241
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DraftsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Email" /> correo@gmail.com
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PinDropIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Dirección" /> Lima - Peru
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </nav>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17020.630463585374!2d-77.05637115593359!3d-12.04374503007184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f619ee3ec7%3A0x14206cb9cc452e4a!2sLima!5e0!3m2!1ses!2spe!4v1716499049289!5m2!1ses!2spe" width="100%" height="200"></iframe>
                        </Grid>
                    </Grid>
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
