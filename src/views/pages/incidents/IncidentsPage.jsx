import React, { useState, useEffect } from 'react';
import { IconButton, Grid, Alert, Popper, Fade, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import TotalIncidentsCard from './TotalIncidentsCard';
import TotalOpenCard from './TotalOpenCard';
import TotalCloseCard from './TotalCloseCard';
import TotalHoursCard from './TotalHoursCard';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useTheme } from '@mui/material/styles';
import CreateIncidentDialog from './CreateIncidentDialog';
import IncidentsDataGrid from './IncidentsDataGrid';
import CircularWithValueLabel from 'views/utilities/CircularProgressWithLabel';
import useIncidentsData from 'hooks/useIncidentsData';
import useServicesData from 'hooks/useServicesData';
import { useIntl } from 'react-intl';

const IncidentsPage = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { totalIncidents, totalOpen, totalClose, totalHours, incidents, isLoading, handleCreateIncident } = useIncidentsData();
  const { services } = useServicesData();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState('');
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [newTicket, setNewTicket] = useState(null);

  const openCreateModal = () => {
    setOpen(true);
  };
  const handleModalClose = () => setOpen(false);
  const customization = JSON.parse(localStorage.getItem('user'));

  const validateAndCreateIncident = () => {
    const parameters = {
      servicio_id: selectedOption,
      texto: description
    };

    const newErrors = {};
    if (selectedOption === null) {
      newErrors.service = 'El servicio es obligatorio.';
    }
    if (description.length < 25) {
      newErrors.description = 'La descripción debe tener al menos 25 caracteres.';
    }
    if (Object.keys(newErrors).length === 0) {
      handleCreateIncident(parameters, setErrors, fetchData, setIsAlertSuccess, setOpen);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalIncidentsCard
                title={intl.formatMessage({ id: 'incidents.cards.incidents' })}
                total={parseInt(totalIncidents)}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalOpenCard title={intl.formatMessage({ id: 'incidents.cards.open' })} total={parseInt(totalOpen)} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalCloseCard
                title={intl.formatMessage({ id: 'incidents.cards.closed' })}
                total={parseInt(totalClose)}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TotalHoursCard title={intl.formatMessage({ id: 'incidents.table.hours' })} total={totalHours} isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
        {customization && customization.new_tickets === 1 && (
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <IconButton title={intl.formatMessage({ id: 'incidents.buttons.new' })} onClick={openCreateModal}>
                  <AddCircleRoundedIcon sx={{ color: theme.palette.primary[800] }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          {isLoading ? (
            <div className="center-spinner">
              <CircularWithValueLabel color="secondary" />
            </div>
          ) : (
            <IncidentsDataGrid rows={incidents} />
          )}
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
            handleCreateIncident={validateAndCreateIncident}
            errors={errors}
            setErrors={setErrors}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default IncidentsPage;
