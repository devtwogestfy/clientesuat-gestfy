import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Avatar, Box, Stack, Button, Grid, Tabs, Tab } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ClientTabPanel from './ClientTabPanel';
import SuccessDialog from './SuccessDialog';
import MessageDialog from './MessageDialog';
import GetInfoClient from 'settings/servicios/client';
import { createIncident } from 'settings/servicios/incident';
import { FormattedMessage } from 'react-intl';
import CircularWithValueLabel from 'views/utilities/CircularProgressWithLabel';
import getCustomization from 'utils/customization';

import LocalProfileBackground from 'assets/images/banner.png';
const customization = getCustomization();
const ExternalProfileBackground = customization && customization.img_banner ? customization.img_banner : '';
const ProfileImage = 'https://example.com/path/to/user-round.svg';
const ProfileBackground = ExternalProfileBackground || LocalProfileBackground;

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
              <CardContent></CardContent>
            </Card>
          </Box>
          <Box sx={{ width: '100%' }}>
            <ClientTabPanel clientInfo={clientInfo} handleOpen={handleOpen} />
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
