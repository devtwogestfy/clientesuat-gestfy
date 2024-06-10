import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,Grid, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { FormattedMessage } from 'react-intl';
import GetInfoClient from 'settings/servicios/client';

const NavGroup = ({ item }) => {
  const theme = useTheme();
  const infoClient = GetInfoClient();
  const [openModal, setOpenModal] = useState(false);
  const [termsConditions, setTermsConditions] = useState(null);
  const customization = JSON.parse(localStorage.getItem('user'));
  
  const fetchTermsData = async () => {
    try {
      const client = await infoClient.getTermsConditions();
      setTermsConditions(client.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTermsData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const items = item.children?.map((menu) => {
    if (menu.permission === 1) {
      switch (menu.type) {
        case 'collapse':
          return <NavCollapse key={menu.id} menu={menu} level={1} />;
        case 'item':
          return <NavItem key={menu.id} item={menu} level={1} />;
        default:
          return (
            <Typography key={menu.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    }
    return null; // Add this return statement to ensure the map function always returns a value
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
      <div style={{ position: 'fixed', bottom: '0' }}>
        <List>
          <Typography variant="body1" align="center" sx={{ px: 2 }}>
            {customization && customization.terms_conditions && (
              <Button onClick={handleOpenModal} color="secondary">
                <FormattedMessage id="dialogs.title.terms_conditions" />
              </Button>
            )}
          </Typography>
        </List>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="dialog-title" aria-describedby="dialog-description" maxWidth="md" fullWidth>
        <DialogTitle id="dialog-title">
        <Grid item>
            <Typography variant="h3"><FormattedMessage id="dialogs.title.terms_conditions" /></Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            {termsConditions}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            <FormattedMessage id="router.buttons.close" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object.isRequired
};

export default NavGroup;
