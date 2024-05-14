import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { Badge } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useTheme } from '@mui/material/styles';
import { fCurrency } from 'utils/format-number';

// eslint-disable-next-line react/prop-types
function SummaryInfo({ total, title, isNumber }) {
    const theme = useTheme();
    return (
        <Avatar
            variant="rounded"
            sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.largeAvatar,
                backgroundColor: theme.palette.primary[800],
                color: '#fff',
                mt: 1
            }}
        >
            {isNumber ? (
                <Typography title={title} sx={{ fontSize: '0.7rem', fontWeight: 900 }}>
                    {fCurrency(total)}
                </Typography>
            ) : (
                <Badge badgeContent={total} color="primary" title={title}>
                    <ReceiptLongIcon color="#fff" />
                </Badge>
            )}
        </Avatar>
    );
}

export default SummaryInfo;
