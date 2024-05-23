// src/views/pages/services/ServicesPage.jsx
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import PrepaysDataGrid from './PrepaysDataGrid';
import { useParams } from 'react-router-dom';
import GetInfoService from 'configuraciones/servicios/service';
import { useState, useEffect } from 'react';
import BackButton from 'views/utilities/BottonBack';
import { FormattedMessage } from 'react-intl';

const PrepaysPage = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [title, setTitle] = useState([]);
    const infoService = GetInfoService();

    const fetchData = async () => {
        try {
            infoService.getPrepayments(1, 25, '', params.id).then((result) => {
                setData(result.items);
                setTitle(result.servicio);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                        <FormattedMessage id="services.prepay.historic" /> {title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <PrepaysDataGrid rows={data} />
                </Grid>
                <Grid item xs={12}>
                    <BackButton />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default PrepaysPage;
