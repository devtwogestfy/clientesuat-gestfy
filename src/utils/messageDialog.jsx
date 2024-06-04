import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const MessageDialog = ({ open, handleClose, title, message }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="message-dialog-title">
      <DialogTitle id="message-dialog-title">
        <ErrorIcon sx={{ color: 'error.dark', mr: 1 }} /> {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const showMessageDialog = (title, message) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(div);
  };

  const root = createRoot(div);
  root.render(<MessageDialog open={true} handleClose={handleClose} title={title} message={message} />);
};

export default MessageDialog;
