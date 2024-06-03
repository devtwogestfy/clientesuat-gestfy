import React, { useState, useEffect } from 'react';
import { Grid, Alert, Popper, Fade, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/service';
import GetInfoIncident from 'configuraciones/servicios/incident';
import TotalIncidentsCard from '../incidents/TotalIncidentsCard';
import TotalOpenCard from '../incidents/TotalOpenCard';
import TotalCloseCard from '../incidents/TotalCloseCard';
import TotalHoursCard from '../incidents/TotalHoursCard';
import { useTheme } from '@mui/material/styles';
import CreateIncidentDialog from '../incidents/CreateIncidentDialog';
import PostInfoService from 'configuraciones/servicios/post-info-client';
import IncidentsDataGrid from '../incidents/IncidentsDataGrid';

const IncidentTabPanel = () => {
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
  const infoIncident = GetInfoIncident();
  const postInfoService = PostInfoService();
  infoIncident.getIncidentsSummary().then((summaryIncident) => {
    setTotalIncidents(summaryIncident.numeroincidencias);
    setTotalOpen(summaryIncident.abiertas);
    setTotalClose(summaryIncident.cerradas);
  });

  infoIncident.getSat().then((summaryHour) => {
    setTotalHours(summaryHour.formateado);
  });

  const fetchData = async () => {
    infoIncident.getTickets().then((dataIncidents) => {
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

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Grid container spacing={gridSpacing} direction="column">
            <Grid item xs={12}>
              <TotalIncidentsCard title="Incidencias" total={parseInt(totalIncidents)} />
            </Grid>
            <Grid item xs={12}>
              <TotalOpenCard title="Abiertas" total={parseInt(totalOpen)} />
            </Grid>
            <Grid item xs={12}>
              <TotalCloseCard title="Cerradas" total={parseInt(totalClose)} />
            </Grid>
            <Grid item xs={12}>
              <TotalHoursCard title="Horas" total={totalHours} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
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

export default IncidentTabPanel;
