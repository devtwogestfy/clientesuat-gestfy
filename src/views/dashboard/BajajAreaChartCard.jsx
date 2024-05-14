import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import chartData from './chart-data/bajaj-area-chart';
import { useTheme } from '@mui/material/styles';
import GetInfoService from 'configuraciones/servicios/info-client';

const BajajAreaChartCard = () => {
    const theme = useTheme();
    const orangeDark = theme.palette.secondary[800];
    const [chartOptions, setChartOptions] = useState(chartData.options);
    const [data, setData] = useState([]);
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: { theme: 'light' }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
        setChartOptions(newSupportChart);
        fetchData();
    }, [navType, orangeDark]);

    // Función para actualizar los datos del gráfico

    const fetchData = async () => {
        try {
            GetInfoService()
                .getBilling()
                .then((billing) => {
                    setData(billing);
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(data);
    console.log(chartData.series);
    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: 'secondary.dark' }}>
                                Bajaj Finery
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: 'grey.800' }}>
                                $1839.00
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                        10% Profit
                    </Typography>
                </Grid>
            </Grid>
            <Chart options={chartOptions} series={chartData.series} type="area" height={180} />
        </Card>
    );
};

export default BajajAreaChartCard;
