import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { fShortenNumber } from '../../../utils/format-number';
import CardWrapper from '../../utilities/CardWrapper';

const TotalCloseCard = ({ isLoading, title, total }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false} firstcolor={theme.palette.success.dark} secondcolor={theme.palette.success.light}>
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
                        backgroundColor: theme.palette.success.light,
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <IconAlertTriangleFilled fontSize="inherit" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container direction="column" alignItems="left">
                  <Grid item>
                    <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.2 }}>
                      {fShortenNumber(total.toString())}
                    </Typography>
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

TotalCloseCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  total: PropTypes.number
};

export default TotalCloseCard;
