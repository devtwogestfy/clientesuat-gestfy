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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const infoService = GetInfoService();

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };
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
        console.log(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          // Display error dialog
          setErrorMessage('Bad request. Please check your input.');
          setErrorDialogOpen(true);
        }
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
    console.log(body);
    infoService
      .updateRouterConfig(body, params.id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);

        // Display error dialog
        setErrorMessage('Bad request. Please check your input.');
        setErrorDialogOpen(true);
      })
      .finally(() => {
        //openSnack('dialogs.snacks.put_router');
      });
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      {isLoading ? (
        <CircularWithValueLabel color="secondary" />
      ) : (
        <>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormularioWifi wifi24Data={wifi24Data} updateData={updateData}></FormularioWifi>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormularioWifi5G wifi5Data={wifi5Data} updateData={updateData}></FormularioWifi5G>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormularioLan lanData={lanData} updateData={updateData}></FormularioLan>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormularioPuertos portsData={portsData} funcionPuertos={updateData}></FormularioPuertos>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <BackButton />
          </Grid>
          <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <DialogContentText>{errorMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseErrorDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Grid>
  );
};

export default RouterPage;
