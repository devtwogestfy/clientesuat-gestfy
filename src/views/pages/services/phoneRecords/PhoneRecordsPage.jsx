/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import TotalServiceCard from './TotalServiceCard';
import dayjs from 'dayjs';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ActionsButtons from './ActionsButtons';
import TablePhoneRecords from './TablePhoneRecords';
import { useParams } from 'react-router-dom';
import { TextField, Alert, Snackbar } from '@mui/material';
import 'dayjs/locale/es';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

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

const PhoneRecordsPage = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(dayjs().startOf('month'));
    const [value, setValue] = useState(dayjs());
    const params = useParams();
    const [showInfo, setShowInfo] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [incomingCheck, setIncomingCheck] = useState(false);
    const [childData, setChildData] = useState({});
    const [details, setDetails] = useState({});

    const handleChildData = (data) => {
        setChildData(data);
        console.log(childData);
        if (childData.detalle != undefined && childData.items != undefined) {
            setDetails(childData.detalle);
            setData(childData.items);
        }
    };

    const code = params.id;
    useEffect(() => {
        if (code.split('-')[0] !== 'F') {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    }, [code]);

    const handleEndDateChange = (newValue) => {
        const threeMonthsLater = startDate.add(3, 'month');

        if (newValue.isAfter(threeMonthsLater)) {
            setError('El rango no puede ser mayor de 3 meses.');
            setSnackbarOpen(true);
            setIncomingCheck(true);
        } else {
            setError('');
            setValue(newValue);
            setIncomingCheck(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleResetDates = () => {
        setStartDate(dayjs().startOf('month'));
        setValue(dayjs());
    };

    const handleDownloadData = () => {
        alert('hi')
    };
    const isDetailsEmpty = Object.keys(details).length === 0;

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        {showInfo && (
                            <>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TotalServiceCard
                                        title="Total SMS"
                                        total={!isDetailsEmpty ? details.sms : '0'}
                                        colorCard={theme.palette.primary.dark}
                                        backgroundCard={theme.palette.primary[800]}
                                        icon="router"
                                        showInfo
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TotalServiceCard
                                        title="Total Datos"
                                        total={!isDetailsEmpty ? details.datos : '0'}
                                        colorCard={theme.palette.warning.dark}
                                        backgroundCard={theme.palette.warning.main}
                                        icon="phone"
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TotalServiceCard
                                title="Total Llamadas"
                                total={!isDetailsEmpty ? details.salientesformatted : '0'}
                                colorCard={theme.palette.success.dark}
                                backgroundCard={theme.palette.success.light}
                                icon="mobile"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="Fecha desde"
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        format="DD/MM/YYYY"
                                        renderInput={(params) => <TextField {...params} sx={{ margin: 0 }} />}
                                    />
                                    <DatePicker
                                        label="Fecha hasta"
                                        value={value}
                                        onChange={handleEndDateChange}
                                        format="DD/MM/YYYY"
                                        renderInput={(params) => <TextField {...params} sx={{ margin: 0 }} />}
                                    />
                                </DemoContainer>
                                <Snackbar
                                    open={snackbarOpen}
                                    autoHideDuration={6000}
                                    onClose={handleSnackbarClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                >
                                    <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                                        {error}
                                    </Alert>
                                </Snackbar>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingTop: '10px', paddingRight: '15rem' }}>
                            <ActionsButtons
                                startDate={startDate}
                                endDate={value}
                                code={code}
                                incomingCheck={incomingCheck}
                                onSendData={handleChildData}
                                onResetDates={handleResetDates}
                                onDownloadData={handleDownloadData}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <TablePhoneRecords rows={data} />
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default PhoneRecordsPage;
