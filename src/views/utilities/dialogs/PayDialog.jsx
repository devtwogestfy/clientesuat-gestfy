import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, Grid, Typography, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

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
                            <Button variant="contained" color="primary" onClick={handleClosePay} sx={{ width: '80%' }}>
                                <FormattedMessage id="dialogs.buttons.send" />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="error" onClick={handleClosePay} sx={{ width: '80%' }}>
                                <FormattedMessage id="dialogs.buttons.cancel" />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="error" onClick={handleClosePay} sx={{ width: '80%' }}>
                                <FormattedMessage id="dialogs.buttons.cancel" />
                            </Button>
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
