import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import BillingInformationCard from './BillingInformationCard';
import IncidentsCard from './IncidentsCard';
import LastestInvoicesCard from './LastestInvoicesCard';
import PopularCard from './PopularCard';
import ServicesCard from './ServicesCard';
import { gridSpacing } from 'store/constant';
import CircularWithValueLabel from 'views/utilities/CircularProgressWithLabel';
import GetCustomization from 'services/customizeService';

const customization = await GetCustomization();

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
      /*  
      <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <BillingInformationCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <LastestInvoicesCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ServicesCard />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {customization.view_tickets === 1 && <IncidentsCard isLoading={isLoading} />}
          </Grid>
          <Grid item xs={12} md={12}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid> */
    <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <LastestInvoicesCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <ServicesCard />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            {customization.view_tickets === 1 && <IncidentsCard isLoading={isLoading} />}
          </Grid>
          <Grid item xs={12} md={12}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
