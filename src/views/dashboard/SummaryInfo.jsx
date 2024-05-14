import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import { Badge } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RouterIcon from '@mui/icons-material/Router';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PhoneIcon from '@mui/icons-material/Phone';
import ShareIcon from '@mui/icons-material/Share';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import { fCurrency } from 'utils/format-number';

// eslint-disable-next-line react/prop-types
function SummaryInfo({ total, title, isNumber, color, icon }) {
    const theme = useTheme();

    const backgroundcolor =
        color === 'primary'
            ? theme.palette.primary[800]
            : color === 'warning'
              ? theme.palette.warning.main
              : color === 'success'
                ? theme.palette.success.light
                : '';

    return (
        <Stack spacing={2} direction="row">
            <Badge badgeContent={total} color={total ? 'primary' : 'error'} title={title}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: backgroundcolor,
                        color: '#fff',
                        mt: 1
                    }}
                >
                    {isNumber ? (
                        <Typography title={title} sx={{ fontSize: '0.7rem', fontWeight: 900 }}>
                            {fCurrency(total)}
                        </Typography>
                    ) : icon === 'receipt' ? (
                        <ReceiptLongIcon sx={{color: theme.palette.primary.light}} />
                    ) : icon === 'router' ? (
                        <RouterIcon sx={{color: theme.palette.primary.light}} />
                    ) : icon === 'phone' ? (
                        <PhoneIcon sx={{color: theme.palette.primary.light}} />
                    ) : icon === 'mobile' ? (
                        <PhoneIphoneIcon sx={{color: theme.palette.primary.light}} />
                    ) : icon === 'other' ? (
                        <ShareIcon sx={{color: theme.palette.primary.light}} />
                    ) : icon === 'alert' ? (
                        <IconAlertTriangleFilled sx={{color: theme.palette.primary.light}} />
                    ) : (
                        ''
                    )}
                </Avatar>
            </Badge>
        </Stack>
    );
}

export default SummaryInfo;
