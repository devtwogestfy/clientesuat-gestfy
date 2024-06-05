import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import ServicesPage from 'views/pages/services/ServicesPage';
import GetInfoService from 'settings/servicios/service';
import SummaryInfo from './SummaryInfo';
import { FormattedMessage } from 'react-intl';
import { useCookies } from 'react-cookie';
import { getSessionId } from 'utils/sessionId';
import { useNavigate } from 'react-router-dom';
import CardWrapper from '../utilities/CardWrapper';

const ServicesCard = ({ isLoading }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [, setData] = useState([]);
  const [phones, setPhones] = useState(0);
  const [mobiles, setMobiles] = useState(0);
  const [ftth, setFtth] = useState(0);
  const [others, setOthers] = useState(0);
  const [, , removeCookie] = useCookies([getSessionId()]);
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesResponse, phonesResponse] = await Promise.all([
        GetInfoService().getServices(1, 500),
        GetInfoService().getPhones(1, 500)
      ]);

      const servicesData = servicesResponse.items;
      const phonesData = phonesResponse.items;

      const newData = [...servicesData, ...phonesData];
      setData(newData);

      let phonesCount = 0;
      let mobilesCount = 0;
      let ftthCount = 0;
      let othersCount = 0;

      newData.forEach((element) => {
        if (element.tipo === 'F') phonesCount++;
        if (element.tipo === 'M') mobilesCount++;
        if (!element.tipo && element.tecnologia === 1) ftthCount++;
        if ((element.tipo && element.tipo !== 'F' && element.tipo !== 'M') || (!element.tipo && element.tecnologia !== 1)) othersCount++;
      });

      setPhones(phonesCount);
      setMobiles(mobilesCount);
      setFtth(ftthCount);
      setOthers(othersCount);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        removeCookie(getSessionId());
        navigate('/login');
      }
    }
  };
  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false} firstcolor={theme.palette.warning.dark} secondcolor={theme.palette.warning.main}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <SummaryInfo total={ftth.toString()} titleId="services.cards.ftth" color="warning" icon="router" />
                  </Grid>
                  <Grid item>
                    <SummaryInfo total={phones.toString()} titleId="services.cards.phone" color="warning" icon="phone" />
                  </Grid>
                  <Grid item>
                    <SummaryInfo total={mobiles.toString()} titleId="services.cards.mobile" color="warning" icon="mobile" />
                  </Grid>
                  <Grid item>
                    <SummaryInfo total={others.toString()} titleId="services.cards.others" color="warning" icon="other" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      <FormattedMessage id="dashboard.showcase_services" />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.warning.main,
                        color: theme.palette.warning.dark
                      }}
                    >
                      <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} onClick={openModal} />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
            <DialogTitle>
              <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                <CloseIcon />
              </IconButton>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h3">
                    <FormattedMessage id="dashboard.showcase_services" />
                  </Typography>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <ServicesPage></ServicesPage>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose} color="error">
                <FormattedMessage id="dialogs.buttons.cancel" />
              </Button>
            </DialogActions>
          </Dialog>
        </CardWrapper>
      )}
    </>
  );
};

ServicesCard.propTypes = {
  isLoading: PropTypes.bool
};

export default ServicesCard;
