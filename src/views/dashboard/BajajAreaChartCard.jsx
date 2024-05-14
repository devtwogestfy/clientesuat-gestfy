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
     const months = data.map(item => item.mes);
    const series = [{
      name: 'Suma',
      data: data.map(item => parseFloat(item.suma)),
    }];

    const options = {
        type: 'area',
        height: 95,
        options: {
            chart: {
                id: 'support-chart',
                sparkline: {
                    enabled: true
                }
            },
            labels: months,
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 1
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              opposite: true
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
                    title: {
                        months
                    }
                },
                marker: {
                    show: false
                }
            }
        }
    };

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Chart options={options} series={series} type="area" height={180} />
        </Card>
    );
};

export default BajajAreaChartCard;
