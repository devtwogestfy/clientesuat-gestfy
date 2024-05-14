import { Avatar, Typography } from '@mui/material';
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
            ) : (
                <Badge badgeContent={total} color={color} title={title}>
                    {icon === 'receipt' ? (
                        <ReceiptLongIcon color="#fff" />
                    ) : icon === 'router' ? (
                        <RouterIcon color="#fff" />
                    ) : icon === 'phone' ? (
                        <PhoneIcon color="#fff" />
                    ) : icon === 'mobile' ? (
                        <PhoneIphoneIcon color="#fff" />
                    ) : icon === 'other' ? (
                        <ShareIcon color="#fff" />
                    ) : icon === 'alert' ? (
                        <IconAlertTriangleFilled color="#fff" />
                    ) : (
                        ''
                    )}
                </Badge>
            )}
        </Avatar>
    );
}

export default SummaryInfo;
