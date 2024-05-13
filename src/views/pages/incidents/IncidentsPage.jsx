import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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

    const infoService = GetInfoService();
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
            console.log(dataIncidents);
        });
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
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
                            <IconButton backgroundColor={'info'} color={'info'} title="Nueva Incidencia">
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
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default IncidentsPage;
