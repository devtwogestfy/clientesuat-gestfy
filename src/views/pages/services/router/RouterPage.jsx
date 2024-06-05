import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import FormularioWifi from './formularioWifi';
import FormularioWifi5G from './formularioWifi5G';
import FormularioLan from './formularioLan';
import FormularioPuertos from './formularioPuertos';
import GetInfoService from 'settings/servicios/service';
import BackButton from 'views/utilities/BottonBack';
import { useParams } from 'react-router-dom';
import CircularWithValueLabel from 'views/utilities/CircularProgressWithLabel';
import { Box } from '@mui/material';
import { padding } from '@mui/system';

const RouterPage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [wifi24Data, setWifi24Data] = useState({ ssid: '', password: '' });
    const [wifi5Data, setWifi5Data] = useState({ ssid: '', password: '' });
    const [lanData, setLanData] = useState({
        ip: '',
        mask: '',
        dhcpStart: '',
        dhcpEnd: ''
    });
    const [portsData, setPortsData] = useState([]);
    const infoService = GetInfoService();

    const fetchData = () => {
        infoService
            .getRouterData(params.id)
            .then((res) => {
                setWifi24Data({
                    ssid: res.ssid || '',
                    password: res.passcli || ''
                });
                setWifi5Data({
                    ssid: res.ssid5 || '',
                    password: res.passcli5 || ''
                });
                setLanData({
                    ip: res.lanip || '',
                    mask: res.lanmask || '',
                    dhcpStart: res.landesde || '',
                    dhcpEnd: res.lanhasta || ''
                });
                const portsDataArray = res.items ? (Array.isArray(res.items) ? res.items : Object.values(res.items)) : [];
                const formattedPortsData = portsDataArray.map((item) => ({
                    id: item.id,
                    extport: item.desde,
                    intport: item.hasta,
                    ip: item.ip,
                    protocol: item.protocolo
                }));
                setPortsData(formattedPortsData);
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateData = (type, data) => {
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
        const body = {
            wifi24: wifi24Data,
            wifi5: wifi5Data,
            lan: lanData,
            ports: portsData
        };
        //console.log(body);
        infoService
            .updateRouterConfig(body, params.id)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    return (
        <>
            {isLoading ? (
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={3}>
                        <CircularWithValueLabel color="secondary" />
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={gridSpacing} justifyContent="center" alignItems="stretch" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Box style={{ padding: '10px' }}>
                            <FormularioWifi wifi24Data={wifi24Data} updateData={updateData} />
                        </Box>
                        <Box style={{ padding: '10px' }}>
                            <FormularioWifi5G wifi5Data={wifi5Data} updateData={updateData} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={8}>
                        <Box style={{ padding: '10px' }}>
                            <FormularioLan lanData={lanData} updateData={updateData} />
                        </Box>

                        <Box style={{ padding: '10px' }}>
                            <FormularioPuertos portsData={portsData} funcionPuertos={updateData} />
                        </Box>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default RouterPage;
