import * as React from 'react';
import { Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { FormattedMessage } from 'react-intl';

const ClientTabPanel = ({ clientInfo }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
              <List>
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
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17020.630463585374!2d-77.05637115593359!3d-12.04374503007184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f619ee3ec7%3A0x14206cb9cc452e4a!2sLima!5e0!3m2!1ses!2spe!4v1716499049289!5m2!1ses!2spe"
            width="100%"
            height="200"
          ></iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default ClientTabPanel;
