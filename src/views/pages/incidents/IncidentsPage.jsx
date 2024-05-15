import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import {
    Alert,
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
    Popper,
    Fade
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/info-client';
import TotalIncidentsCard from './TotalIncidentsCard';
import TotalOpenCard from './TotalOpenCard';
import TotalCloseCard from './TotalCloseCard';
import TotalHoursCard from './TotalHoursCard';
import { fDate } from 'utils/format-date';
import StatusColor from './StatusColor';
import ActionsButtons from './ActionsButtons';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CloseIcon from '@mui/icons-material/Close';
import PostInfoService from 'configuraciones/servicios/post-info-client';
import MenuItem from '@mui/material/MenuItem';

const columns = [
    {
        field: 'notas',
        headerName: '',
        width: 50,
        renderCell: (params) => {
            return (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <ActionsButtons notas={params.row.notas} />
                </Box>
            );
        }
    },
    {
        field: 'numero',
        headerName: 'Número',
        width: 150
    },
    {
        field: 'alta',
        headerName: 'Alta',
        width: 150,
        valueGetter: (value, row) => `${fDate(row.alta) || ''}`
    },
    {
        field: 'texto',
        headerName: 'Descripción',
        width: 180
    },
    {
        field: 'servicio',
        headerName: 'Servicio',
        sortable: false,
        width: 250
    },
    {
        field: 'horas',
        headerName: 'Horas',
        sortable: false,
        width: 160
    },
    {
        field: 'estado_id',
        headerName: 'Estado',
        sortable: false,
        width: 160,
        renderCell: (params) => {
            return (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <StatusColor estado_id={params.row.estado_id} />
                </Box>
            );
        }
    }
];

const ColorBox = ({ bgcolor, title, data, dark }) => (
    <>
        <Card sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor,
                    color: dark ? 'grey.800' : '#ffffff'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" color="inherit">
                        {title}
                    </Typography>
                )}
                {!title && <Box sx={{ p: 1.15 }} />}
            </Box>
        </Card>
        {data && (
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle2">{data.label}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        {data.color}
                    </Typography>
                </Grid>
            </Grid>
        )}
    </>
);

ColorBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool
};

const IncidentsPage = () => {
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

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
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
                            <IconButton
                                title="Nueva Incidencia"
                                onClick={() => {
                                    openCreateModal();
                                }}
                            >
                                <AddCircleRoundedIcon></AddCircleRoundedIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowClassName={getRowClassName}
                            rows={incidents}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5
                                    }
                                }
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                        />
                    </Box>
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
                    <Dialog open={open} onClose={handleModalClose} maxWidth="md" fullWidth>
                        <DialogTitle style={{ backgroundColor: '#4527a0' }}>
                            <IconButton onClick={handleModalClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                                <CloseIcon />
                            </IconButton>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <Typography variant="h3" color={'#fff'}>
                                        Nueva Incidencia
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2} sx={{ padding: 3 }}>
                                <Grid item xs={12}>
                                    {/* ComboBox */}

                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        onChange={(event, value) => {
                                            setSelectedOption(value.id);
                                            if (value.id) {
                                                setErrors((prevErrors) => ({ ...prevErrors, service: '' }));
                                            }
                                        }}
                                        sx={{ width: '100%' }}
                                        options={services.map((option) => ({ id: option.id, label: option.nombre }))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Servicio"
                                                {...(errors.service && { error: errors.service })}
                                                helperText={errors.service}
                                            />
                                        )}
                                        renderOption={(props, option) => {
                                            return (
                                                <MenuItem {...props} key={option.id}>
                                                    {option.label}
                                                </MenuItem>
                                            );
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* TextBox */}
                                    <TextField
                                        label="Descripción"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={description}
                                        onChange={(event) => {
                                            setDescription(event.target.value);
                                            if (event.target.value.length >= 25) {
                                                setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
                                            }
                                        }}
                                        error={Boolean(errors.description)}
                                        helperText={errors.description}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" onClick={handleCreateIncident} color="primary">
                                Enviar
                            </Button>
                            <Button variant="outlined" onClick={handleModalClose} color="error">
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default IncidentsPage;
