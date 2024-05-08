import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import BillingInformationCard from './BillingInformationCard';
import IncidentsCard from './IncidentsCard';
import LastestInvoicesCard from './LastestInvoicesCard';
import PopularCard from './PopularCard';
import ServicesCard from './ServicesCard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CloseIcon from '@mui/icons-material/Close';
import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [modalComponent, setModalComponent] = useState(false);

  const abrirModal = () => {
    setModalComponent(true);
  };

  const cerrarModalComponent = () => {
    setModalComponent(false);
  };

  useEffect(() => {
    setModalComponent(false);
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <BillingInformationCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <LastestInvoicesCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <ServicesCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <IncidentsCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={modalComponent} onClose={cerrarModalComponent} maxWidth="md" fullWidth>
        <DialogTitle>
          <IconButton onClick={cerrarModalComponent} sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon />
          </IconButton>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar style={{ marginRight: '16px' }}>
                <AppRegistrationIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h3">Registro de Productos</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {/* Aquí se renderiza el formulario */}
           
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={cerrarModalComponent} color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Dashboard;
