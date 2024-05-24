import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import FormularioWifi from './formularioWifi';
import FormularioWifi5G from './formularioWifi5G';
import FormularioLan from './formularioLan';
import FormularioPuertos from './formularioPuertos';
import GetInfoService from 'configuraciones/servicios/service';
import BackButton from 'views/utilities/BottonBack';
import { useParams } from 'react-router-dom';
import { portValidator } from 'utils/portValidator';

const RouterPage = () => {
    const params = useParams();
    const [wifi24Data, setWifi24Data] = useState({});
    const [wifi5Data, setWifi5Data] = useState({});
    const [lanData, setLanData] = useState({});
    const [portsData, setPortsData] = useState({});
    const infoService = GetInfoService();

    const updateData = (type, data) => {
        console.log('========================');
        console.log(data);
        console.log('========================');
        switch (type) {
            case 'wifi24':
                setWifi24Data(data);
                break;
            case 'wifi5':
                setWifi5Data(data);
                break;
            case 'lan':
                setLanData(data);
                break;
            case 'ports':
                setPortsData(data);
                break;
            default:
                break;
        }

        handleSubmit();
    };

    const handleSubmit = () => {
        if ((wifi24Data.ssid && !wifi24Data.password) || (!wifi24Data.ssid && wifi24Data.password) || !wifi24Data.valid) {
            return;
        }

        if ((wifi5Data.ssid && !wifi5Data.password) || (!wifi5Data.ssid && wifi5Data.password) || !wifi5Data.valid) {
            return;
        }

        if (
            (lanData.ip && (!lanData.mask || !lanData.dhcpStart || !lanData.dhcpEnd)) ||
            (lanData.mask && (!lanData.ip || !lanData.dhcpStart || !lanData.dhcpEnd)) ||
            (lanData.dhcpStart && (!lanData.ip || !lanData.mask || !lanData.dhcpEnd)) ||
            (lanData.dhcpEnd && (!lanData.ip || !lanData.mask || !lanData.dhcpStart)) ||
            !lanData.valid
        ) {
            return;
        }

        if (!portsData.valid) {
            return;
        }

        const body = {
            wifi24: wifi24Data,
            wifi5: wifi5Data,
            lan: lanData,
            ports: portsData.ports
        };

        infoService
            .updateRouterConfig(body, params.id)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
                DialogService.openDialog(0);
            })
            .finally(() => {
                openSnack('dialogs.snacks.put_router');
            });
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioWifi updateData={updateData}></FormularioWifi>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioWifi5G updateData={updateData}></FormularioWifi5G>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={9} md={9} lg={9}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioLan updateData={updateData}></FormularioLan>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormularioPuertos funcionPuertos={updateData}></FormularioPuertos>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <BackButton />
                </Grid>
            </Grid>
        </>
    );
};

export default RouterPage;
