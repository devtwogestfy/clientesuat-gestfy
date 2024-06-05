import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormattedMessage } from 'react-intl';

const SuccessDialog = ({ openSuccess, handleCloseSuccess }) => {
  return (
    <Dialog open={openSuccess} onClose={handleCloseSuccess} aria-labelledby="success-dialog-title">
      <DialogTitle id="success-dialog-title">
        <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
        <FormattedMessage id="incidents.title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {' '}
          <FormattedMessage id="dialogs.snacks.post_incident" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseSuccess} color="primary">
          <FormattedMessage id="router.buttons.close" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
