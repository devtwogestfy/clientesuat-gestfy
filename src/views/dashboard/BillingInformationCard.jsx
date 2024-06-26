import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { IconUser } from '@tabler/icons-react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FormattedMessage } from 'react-intl';
import GetInfoClient from 'settings/servicios/client';
import CardWrapper from '../utilities/CardWrapper';

const BillingInformationCard = ({ isLoading }) => {
  const theme = useTheme();
  const [showData, setShowData] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);

  const infoClient = GetInfoClient();
  const fetchData = async () => {
    try {
      infoClient.getClient().then((client) => {
        setClientInfo(client);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleData = () => {
    setShowData((prev) => !prev);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false} firstcolor={theme.palette.secondary.dark} secondcolor={theme.palette.secondary[800]}>
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
                        backgroundColor: theme.palette.secondary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <IconUser fontSize="inherit" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      <FormattedMessage id="dashboard.showcase_info.title" />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark
                      }}
                      onClick={handleToggleData}
                    >
                      {showData ? (
                        <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                      ) : (
                        <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                      )}
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              {showData && (
                <Grid item>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                    <b>
                      <FormattedMessage id="dashboard.showcase_info.name" />:
                    </b>{' '}
                    {clientInfo && clientInfo ? `${clientInfo.nombre} ${clientInfo.apellido}` : '-'}
                  </Typography>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                    <b>
                      <FormattedMessage id="dashboard.showcase_info.address" />:
                    </b>{' '}
                    {clientInfo && clientInfo.direccion ? `${clientInfo.direccion}` : '-'}
                  </Typography>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                    <b>
                      <FormattedMessage id="dashboard.showcase_info.phones" />:
                    </b>{' '}
                    {clientInfo && clientInfo.tel1 ? `${clientInfo.tel1}` : '-'}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

BillingInformationCard.propTypes = {
  isLoading: PropTypes.bool
};

export default BillingInformationCard;
