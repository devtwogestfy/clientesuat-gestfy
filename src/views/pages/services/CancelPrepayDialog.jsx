import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, Grid, Typography, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { styles } from 'utils/stylesCustom';

const CancelPrepayDialog = ({ openCancel, handleCloseCancel, handleCancelSendPrepay }) => {
  return (
    <Dialog open={openCancel} onClose={handleCloseCancel} maxWidth="sm" fullWidth>
      <DialogContent>
        <Grid container direction="column" item xs={12} sx={{ padding: 3 }} align="center">
          <Grid item container direction="column" justify="center">
            <Typography variant="h4">
              <FormattedMessage id="dialogs.online_payments.cancelprepay" />
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="center" margin={1}>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleCancelSendPrepay} sx={{ width: '80%', ...styles.buttonPrimary }}>
                <FormattedMessage id="dialogs.buttons.send" />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleCloseCancel} sx={{ width: '80%', ...styles.buttonSecondary }}>
                <FormattedMessage id="dialogs.buttons.cancel" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

CancelPrepayDialog.propTypes = {
  openCancel: PropTypes.bool.isRequired,
  handleCloseCancel: PropTypes.func.isRequired,
  handleCancelSendPrepay: PropTypes.func.isRequired
};

export default CancelPrepayDialog;
