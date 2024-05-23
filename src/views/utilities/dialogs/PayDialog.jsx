import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CancelIcon from '@mui/icons-material/Cancel';

const PayDialog = ({ openPay, handleClosePay }) => {
    const navigate = useNavigate();
    console.log(navigate);
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
                            <IconButton color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
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
