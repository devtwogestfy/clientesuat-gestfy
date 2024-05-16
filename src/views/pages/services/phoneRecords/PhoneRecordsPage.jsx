/* eslint-disable no-unused-vars */
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
    const [phones, setPhones] = useState(0);
    const [mobiles, setMobiles] = useState(0);
    const [ftth, setFtth] = useState(0);
    const [others, setOthers] = useState(0);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const params = useParams();
    const [showInfo, setShowInfo] = useState(false);

    const code = params.id;
    useEffect(() => {
        if (code.split('-')[0] !== 'F') {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    }, [code]);

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
                                        total={ftth}
                                        colorCard={theme.palette.primary.dark}
                                        backgroundCard={theme.palette.primary[800]}
                                        icon="router"
                                        showInfo
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TotalServiceCard
                                        title="Total Datos"
                                        total={phones}
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
                                total={mobiles}
                                colorCard={theme.palette.success.dark}
                                backgroundCard={theme.palette.success.light}
                                icon="mobile"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                                    <DatePicker label="Controlled picker" value={value} onChange={(newValue) => setValue(newValue)} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <ActionsButtons />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <TablePhoneRecords />
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default PhoneRecordsPage;
