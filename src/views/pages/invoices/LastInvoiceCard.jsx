import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import EuroSymbolOutlinedIcon from '@mui/icons-material/EuroSymbolOutlined';
import { fCurrency } from '../../../utils/format-number';
import CardWrapper from '../../utilities/CardWrapper';

const LastInvoiceCard = ({ isLoading, title, total }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false} firstcolor={theme.palette.primary.dark} secondcolor={theme.palette.primary[800]}>
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
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <EuroSymbolOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container direction="column" alignItems="left">
                  <Grid item>
                    <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.2 }}>{fCurrency(total)}</Typography>
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

LastInvoiceCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.node,
  total: PropTypes.number
};

export default LastInvoiceCard;
