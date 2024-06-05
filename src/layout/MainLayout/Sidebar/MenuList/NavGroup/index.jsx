import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Button, Modal, Box, Typography } from '@mui/material';

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
      infoClient.getTermsConditions().then((client) => {
        setTermsConditions(client.data);
      });
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
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h2">
            <FormattedMessage id="dialogs.title.terms_conditions" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {termsConditions}
          </Typography>
          <Button onClick={handleCloseModal}>
            {' '}
            <FormattedMessage id="router.buttons.close" />
          </Button>
        </Box>
      </Modal>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
