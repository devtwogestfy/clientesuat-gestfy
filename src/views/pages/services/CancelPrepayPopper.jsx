import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Modal, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

CancelPrepayPopper.propTypes = {
    openPopperCancel: PropTypes.bool.isRequired,
    contentModal: PropTypes.string.isRequired
};

export default function CancelPrepayPopper({ openPopperCancel, contentModal }) {
    return (
        <div>
            <Modal open={openPopperCancel} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ padding: 2, maxWidth: 300, textAlign: 'center' }}>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        <Typography>{contentModal}</Typography>
                    </Alert>
                </Paper>
            </Modal>
        </div>
    );
}
