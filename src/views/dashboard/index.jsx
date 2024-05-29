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

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      {isLoading ? (
        <CircularWithValueLabel color="secondary" />
      ) : (
        <>
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
                <ServicesCard />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <IncidentsCard isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} md={12}>
                <PopularCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
