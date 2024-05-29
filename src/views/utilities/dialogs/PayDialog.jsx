import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CancelIcon from '@mui/icons-material/Cancel';
import ComboPayImage from 'assets/images/logo-pays/combopay-short.png';
import ConektaImage from 'assets/images/logo-pays/conekta-short.png';
import EpaycoImage from 'assets/images/logo-pays/epayco-short.png';
import FlowPagoImage from 'assets/images/logo-pays/flowpago-short.png';
import MercadoPagoImage from 'assets/images/logo-pays/mercadopago-short.png';
import PagueloImage from 'assets/images/logo-pays/paguelo-facil-short.png';
import PaypalImage from 'assets/images/logo-pays/paypal-short.png';
import PayuImage from 'assets/images/logo-pays/payu-short.png';
import PixelPayImage from 'assets/images/logo-pays/pixelpay-short.png';

const PayDialog = ({ openPay, handleClosePay }) => {
  return (
    <Dialog open={openPay} onClose={handleClosePay} maxWidth="sm" fullWidth>
      <DialogContent>
        <Grid container direction="column" item xs={12} sx={{ padding: 3 }} align="center">
          <Grid item container direction="column" justify="center">
            <Typography variant="h4">
              <FormattedMessage id="dialogs.online_payments.redirection" />
            </Typography>
          </Grid>
          <Grid item container direction="row" justify="center" margin={1}>
            <Grid item xs={4}>
              <IconButton
                color="primary"
                onClick={() => {
                  handleClosePay('targeta');
                }}
                sx={{ width: '80%' }}
              >
                <CreditCardIcon fontSize="large" />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.card" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <PhoneIphoneIcon fontSize="large" />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.bizum" />
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={ComboPayImage} alt="Combopay" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.combopay" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={ConektaImage} alt="Conekta" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.conekta" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={EpaycoImage} alt="Epayco" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.epayco" />
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={FlowPagoImage} alt="Flow Pago" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.flowpago" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={MercadoPagoImage} alt="Mercado Pago" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.mercadopago" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={PagueloImage} alt="Paguelo Facil" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.paguelo" />
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={PaypalImage} alt="Paypal" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.paypal" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={PayuImage} alt="PayU" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.payu" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                <img src={PixelPayImage} alt="Pixel Pay" width={40} height={40} />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.pixelpay" />
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <IconButton color="error" onClick={handleClosePay} sx={{ width: '80%' }}>
                <CancelIcon fontSize="large" />
              </IconButton>
              <Typography variant="body2">
                <FormattedMessage id="dialogs.buttons.cancel" />
              </Typography>
            </Grid>
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
