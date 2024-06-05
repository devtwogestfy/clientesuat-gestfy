import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import IncidentsPage from 'views/pages/incidents/IncidentsPage';
import SummaryInfo from './SummaryInfo';
import { getIncidentsSummary } from 'settings/servicios/incident';
import { FormattedMessage } from 'react-intl';
import CardWrapper from '../utilities/CardWrapper';

const IncidentsCard = ({ isLoading }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [totalIncidents, setTotalIncidents] = useState(null);
  const [totalOpen, setTotalOpen] = useState(null);
  const [totalClose, setTotalClose] = useState(null);

  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  getIncidentsSummary().then((summaryIncident) => {
    setTotalIncidents(summaryIncident.numeroincidencias);
    setTotalOpen(summaryIncident.abiertas);
    setTotalClose(summaryIncident.cerradas);
  });

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false} firstcolor={theme.palette.success.dark} secondcolor={theme.palette.success.light}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <SummaryInfo color="success" titleId="dashboard.showcase_incidents.title" total={totalIncidents} icon="alert" />
                  </Grid>
                  <Grid item>
                    <SummaryInfo color="success" titleId="incidents.cards.open" total={totalOpen} icon="alert" />
                  </Grid>
                  <Grid item>
                    <SummaryInfo color="success" titleId="incidents.cards.closed" total={totalClose} icon="alert" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item >
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography sx={{ fontSize: '1.7rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                          <FormattedMessage id="dashboard.showcase_incidents.title" />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.smallAvatar,
                            cursor: 'pointer',
                            backgroundColor: theme.palette.success.light,
                            color: theme.palette.success.dark
                          }}
                        >
                          <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} onClick={openModal} />
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: theme.palette.success[200]
                          }}
                        ></Typography>
                      </Grid>
                    </Grid>
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
                    <FormattedMessage id="dashboard.showcase_incidents.title" />
                  </Typography>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <IncidentsPage></IncidentsPage>
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

IncidentsCard.propTypes = {
  isLoading: PropTypes.bool
};

export default IncidentsCard;
