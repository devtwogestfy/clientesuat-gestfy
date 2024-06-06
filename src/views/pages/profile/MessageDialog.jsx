import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { styles } from 'utils/stylesCustom';

const MessageDialog = ({ open, handleClose, handleSendMessage, message, handleChangeMessage, error }) => {
  const combinedStyles = {
    ...styles.buttonPrimaryHover,
    ...styles.buttonPrimary
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {' '}
        <Typography variant="h3">
          {' '}
          <FormattedMessage id="profile.section.send.message" />
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="profile.section.send.message.description" />
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="message"
          label="Mensaje"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={message}
          onChange={handleChangeMessage}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSendMessage} sx={combinedStyles}>
          <FormattedMessage id="dialogs.buttons.send" />
        </Button>
        <Button variant="contained" onClick={handleClose} style={styles.buttonSecondary}>
          <FormattedMessage id="dialogs.buttons.cancel" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  handleChangeMessage: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default MessageDialog;
