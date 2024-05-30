import React, { useState, useEffect } from 'react';
import { IconButton, Grid, Alert, Popper, Fade, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/info-client';
import TotalIncidentsCard from './TotalIncidentsCard';
import TotalOpenCard from './TotalOpenCard';
import TotalCloseCard from './TotalCloseCard';
import TotalHoursCard from './TotalHoursCard';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useTheme } from '@mui/material/styles';
import CreateIncidentDialog from './CreateIncidentDialog';
import PostInfoService from 'configuraciones/servicios/post-info-client';
import IncidentsDataGrid from './IncidentsDataGrid';

const IncidentsPage = () => {
  const theme = useTheme();
  const [totalIncidents, setTotalIncidents] = useState(null);
  const [totalOpen, setTotalOpen] = useState(null);
  const [totalClose, setTotalClose] = useState(null);
  const [totalHours, setTotalHours] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState('');
  const [services, setServices] = useState([]);
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const openCreateModal = () => {
    setOpen(true);
  };
  const handleModalClose = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const infoService = GetInfoService();
  const postInfoService = PostInfoService();
  infoService.getIncidentsSummary().then((summaryIncident) => {
    setTotalIncidents(summaryIncident.numeroincidencias);
    setTotalOpen(summaryIncident.abiertas);
    setTotalClose(summaryIncident.cerradas);
  });

  infoService.getSat().then((summaryHour) => {
    setTotalHours(summaryHour.formateado);
  });

  const fetchData = async () => {
    infoService.getTickets().then((dataIncidents) => {
      setIncidents(dataIncidents.items);
    });

    infoService.getServicesList(1, 25).then((dataServices) => {
      setServices(dataServices.items);
    });
  };

  const handleCreateIncident = () => {
    const parameters = {
      servicio_id: selectedOption,
      texto: description
    };

    const newErrors = {};
    console.log(selectedOption);
    if (selectedOption === null) {
      newErrors.service = 'El servicio es obligatorio.';
    }
    if (description.length < 25) {
      newErrors.description = 'La descripción debe tener al menos 25 caracteres.';
    }
    if (Object.keys(newErrors).length === 0) {
      postInfoService.createIncident(parameters).then((response) => {
        console.log(response);
        setOpen(false);
        fetchData();
        setIsAlertSuccess(true); // Mostrar la alerta
        setTimeout(() => {
          setIsAlertSuccess(false); // Ocultar la alerta después de un tiempo
        }, 3000);
        setOpen(false);
      });
    } else {
      setErrors(newErrors);
    }
  };
  console.log(incidents);
  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalIncidentsCard title="Incidencias" total={parseInt(totalIncidents)} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalOpenCard title="Abiertas" total={parseInt(totalOpen)} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalCloseCard title="Cerradas" total={parseInt(totalClose)} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalHoursCard title="Horas" total={totalHours} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <IconButton title="Nueva Incidencia" onClick={openCreateModal}>
                <AddCircleRoundedIcon sx={{ color: theme.palette.primary[800] }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <IncidentsDataGrid rows={incidents} />
          <Popper open={isAlertSuccess} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert variant="filled" severity="success">
                    Incidencia creada con éxito.
                  </Alert>
                </Stack>
              </Fade>
            )}
          </Popper>
          <CreateIncidentDialog
            open={open}
            handleClose={handleModalClose}
            services={services}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            description={description}
            setDescription={setDescription}
            handleCreateIncident={handleCreateIncident}
            errors={errors}
            setErrors={setErrors}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default IncidentsPage;
