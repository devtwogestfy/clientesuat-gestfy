// material-ui
import Grid from '@mui/material/Grid';
// project imports
import { gridSpacing } from 'store/constant';
import FormularioWifi from './formularioWifi';
import FormularioWifi5G from './formularioWifi5G';
import FormularioLan from './formularioLan';
import FormularioPuertos from './formularioPuertos';

const RouterPage = () => {
    const actualizar = (data) => {
        console.log('========================');
        console.log(data);
        console.log('========================');
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioWifi></FormularioWifi>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioWifi5G></FormularioWifi5G>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioLan></FormularioLan>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioPuertos funcionPruertos={actualizar}></FormularioPuertos>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default RouterPage;
