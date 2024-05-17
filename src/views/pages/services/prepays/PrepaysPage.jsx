// src/views/pages/services/ServicesPage.jsx
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import PrepaysDataGrid from './PrepaysDataGrid';
import { useParams } from 'react-router-dom';

const PrepaysPage = () => {
    const params = useParams();
    console.log(params);
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>Historico de prepagos del servicio:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <PrepaysDataGrid />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default PrepaysPage;
