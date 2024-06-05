import * as React from 'react';
import { Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Stack, Button, } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { FormattedMessage } from 'react-intl';
import Dashboard from 'views/dashboard';
import HomeIcono from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import ServiceTabPanel from './ServiceTabPanel';
import InvoiceTabPanel from './InvoiceTabPanel';
import IncidentTabPanel from './IncidentTabPanel';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';


const ClientTabPanel = ({ clientInfo, handleOpen }) => {


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography gutterBottom variant="h2" component="div">
                            {clientInfo ? `${clientInfo.nombre} ${clientInfo.apellido}` : '-'}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PhoneAndroidIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography variant="body1">
                            {' '}
                            <FormattedMessage id="dashboard.showcase_services.contact.phone" />
                          </Typography>
                          <Typography variant="body2"> {clientInfo && clientInfo.tel1 ? `${clientInfo.tel1}` : '-'}</Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography variant="body1">
                            <FormattedMessage id="dashboard.showcase_services.contact.email" />
                          </Typography>
                          <Typography variant="body2">{clientInfo && clientInfo.email ? `${clientInfo.email}` : '-'}</Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PinDropIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography variant="body1">
                            <FormattedMessage id="dashboard.showcase_services.contact.address" />
                          </Typography>
                          <Typography variant="body2">{clientInfo && clientInfo.direccion ? `${clientInfo.direccion}` : '-'}</Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
          <Grid item xs={12} sm={12} md={12} container justifyContent="center">
            <Stack direction="row" spacing={4}>
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleOpen}>
                <FormattedMessage id="info.contact" />
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Dashboard />
        </Grid>
      </Grid>
    </>
  );
};

export default ClientTabPanel;
