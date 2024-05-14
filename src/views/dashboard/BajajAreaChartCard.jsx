import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import GetInfoService from 'configuraciones/servicios/info-client';

const BajajAreaChartCard = () => {
    const theme = useTheme();
    const orangeDark = theme.palette.secondary[800];
    const [data, setData] = useState([]);
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    useEffect(() => {
        const newSupportChart = {
            colors: [orangeDark],
            tooltip: { theme: 'light' }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
        fetchData();
    }, [navType, orangeDark]);

    const fetchData = async () => {
        try {
            const billing = await GetInfoService().getBilling();
            setData(billing);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const months = data.map((item) => item.mes);
    const series = [
        {
            name: 'Suma',
            data: data.map((item) => parseFloat(item.suma))
        }
    ];

    const options = {
        chart: {
            id: 'support-chart',
            sparkline: {
                enabled: true
            }
        },

        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        xaxis: {
            categories: months
        },
        legend: {
            horizontalAlign: 'left'
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: true
            },
            y: {
                title: {}
            },
            marker: {
                show: false
            }
        }
    };

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
            <Chart options={options} series={series} type="area" height={95} />
        </Card>
    );
};

export default BajajAreaChartCard;
