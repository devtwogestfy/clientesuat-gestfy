import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, Grid, Typography, IconButton } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import paymentMethods from 'store/paymentMethods';

const PayDialog = ({ openPay, handleClosePay }) => {
  return (
    <Dialog open={openPay} onClose={handleClosePay} maxWidth="sm" fullWidth>
      <DialogContent>
        <Grid container direction="column" item xs={12} sx={{ padding: 3 }} align="center">
          <Grid item container direction="column" justifyContent="center">
            <Typography variant="h4">
              <FormattedMessage id="dialogs.online_payments.redirection" />
            </Typography>
          </Grid>
          <Grid item container direction="row" justifyContent="center" margin={1}>
            {paymentMethods.map((method) => (
              <Grid item xs={4} key={method.id}>
                <IconButton color="primary" onClick={method.onClick} sx={{ width: '80%' }}>
                  {method.icon}
                </IconButton>
                <Typography variant="body2">{method.message}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

PayDialog.propTypes = {
  openPay: PropTypes.bool.isRequired,
  handleClosePay: PropTypes.func.isRequired
};

export default PayDialog;
