import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Avatar, Box, Stack, Button, Grid, Tabs, Tab } from '@mui/material';
import ProfileBackground from 'assets/images/banner.png';
import ProfileImage from 'assets/images/users/user-round.svg';
import MainCard from 'ui-component/cards/MainCard';
import HomeIcono from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import ServiceTabPanel from './ServiceTabPanel';
import InvoiceTabPanel from './InvoiceTabPanel';
import IncidentTabPanel from './IncidentTabPanel';
import ClientTabPanel from './ClientTabPanel';
import SuccessDialog from './SuccessDialog';
import MessageDialog from './MessageDialog';
import GetInfoClient from 'settings/servicios/client';
import { createIncident } from 'settings/servicios/incident';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import CircularWithValueLabel from 'views/utilities/CircularProgressWithLabel';
const customization = JSON.parse(localStorage.getItem('user'));

function CustomTabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfileViewPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [clientInfo, setClientInfo] = useState(null);
  const [message, setMessage] = useState('');
  const infoClient = GetInfoClient();
  const [error, setError] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      infoClient.getClient().then((client) => {
        setClientInfo(client);
      });
      setLoading(false);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setMessage('');
  };

  const handleSendMessage = () => {
    if (message.length < 25) {
      setError(<FormattedMessage id="profile.section.send.message.error" />);
    } else {
      let body = {
        texto: message
      };
      createIncident(body)
        .then((res) => {
          console.log(res);
          handleClose();
          setOpenSuccess(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
    setError('');
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setMessage('');
  };

  return (
    <MainCard>
      {isLoading ? (
        <div className="center-spinner">
          <CircularWithValueLabel color="secondary" />
        </div>
      ) : (
        <>
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
                      {clientInfo ? `${clientInfo.nombre} ${clientInfo.apellido}` : '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} md={6} container justifyContent="flex-end">
                    <Stack direction="row" spacing={2}>
                      <Button component={Link} to="/" variant="outlined" startIcon={<HomeIcono />}>
                        <FormattedMessage id="layout.menu_home" />
                      </Button>
                      <Button variant="contained" endIcon={<SendIcon />} onClick={handleOpen}>
                        <FormattedMessage id="info.contact" />
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
                <Tab label={<FormattedMessage id="layout.menu_info" />} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                <Tab label={<FormattedMessage id="layout.menu_services" />} id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                <Tab label={<FormattedMessage id="layout.menu_invoices" />} id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                {customization && customization.view_tickets === 1 && (
                  <Tab label={<FormattedMessage id="layout.menu_incidents" />} id="simple-tab-3" aria-controls="simple-tabpanel-3" />
                )}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ClientTabPanel clientInfo={clientInfo} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ServiceTabPanel />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <InvoiceTabPanel />
            </CustomTabPanel>
            {customization.view_tickets === 1 && (
              <CustomTabPanel value={value} index={3}>
                <IncidentTabPanel />
              </CustomTabPanel>
            )}
            <MessageDialog
              open={open}
              handleClose={handleClose}
              handleSendMessage={handleSendMessage}
              message={message}
              handleChangeMessage={handleChangeMessage}
              error={error}
            />
            <SuccessDialog openSuccess={openSuccess} handleCloseSuccess={handleCloseSuccess} />
          </Box>
        </>
      )}
    </MainCard>
  );
};

export default ProfileViewPage;
