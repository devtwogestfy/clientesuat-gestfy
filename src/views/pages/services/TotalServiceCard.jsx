import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import RouterIcon from '@mui/icons-material/Router';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PhoneIcon from '@mui/icons-material/Phone';
import ShareIcon from '@mui/icons-material/Share';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { fShortenNumber,fCurrency } from '../../../utils/format-number';

const CardWrapper = styled(MainCard)(({ theme, backgroundcolor, backgroundcard }) => ({
  backgroundColor: backgroundcolor,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: backgroundcard,
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: backgroundcard,
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const TotalServiceCard = ({ isLoading, title, total, colorCard, backgroundCard, icon }) => {
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };
 
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false} backgroundcolor={colorCard} backgroundcard={backgroundCard}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: backgroundCard,
                        color: '#fff',
                        mt: 1
                      }}
                    >
                       {icon === 'router' ? (
                          <RouterIcon fontSize="inherit" />
                        ) : icon === 'phone' ? (
                          <PhoneIcon fontSize="inherit" />
                        ) : icon === 'mobile' ? (
                          <PhoneIphoneIcon fontSize="inherit" />
                        ) : (
                          <ShareIcon fontSize="inherit" />
                        )}

                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
             <Grid item sx={{ mb: 0.75 }}>
              <Grid container direction="column" alignItems="left">
                <Grid item>
                  <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.2 }}>{total}</Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 0.25, mb: 0.75 }}>{title}</Typography>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalServiceCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalServiceCard;