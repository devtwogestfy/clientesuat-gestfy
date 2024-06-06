import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import GetInfoService from 'settings/servicios/service';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

const BajajAreaChartCard = () => {
  //instanciar paquete para traduccion
  const intl = useIntl();

  const theme = useTheme();
  const orangeDark = theme.palette.secondary[800];
  const [data, setData] = useState([]);
  const [totalSum, setTotalSum] = useState(0); // Initialize totalSum state
  const [average, setAverage] = useState(0); // Initialize average state
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

      // Calculate the total sum
      const total = billing.reduce((sum, item) => sum + parseFloat(item.suma), 0);
      setTotalSum(total);
      
      // Calculate the average
      const avg = total / billing.length;
      setAverage(avg);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const months = data.map((item) => item.mes);
  const series = [
    {
      name: intl.formatMessage({ id: 'invoices.total' }),
      data: data.map((item) => parseFloat(item.suma))
    }
  ];

  const options = {
    chart: {
      id: 'support-chart',
      sparkline: {
        enabled: false // Desactivar el modo "sparkline" para más detalles
      },
      toolbar: {
        show: true // Mostrar la barra de herramientas del gráfico
      }
    },
    dataLabels: {
      enabled: true // Activar etiquetas de datos
    },
    stroke: {
      curve: 'smooth',
      width: 2 // Aumentar el ancho de la línea
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: months
    },
    legend: {
      show: true,
      position: 'top', // Posición de la leyenda
      horizontalAlign: 'center', // Alineación horizontal
      markers: {
        width: 10,
        height: 10,
        radius: 12
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        formatter: (val) => `$${val.toFixed(2)}`
      },
      marker: {
        show: true
      }
    },
    title: {
      text:  intl.formatMessage({ id: 'dashboard.showcase_graph.title' }),
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: theme.palette.text.primary
      }
    },
    annotations: {
      yaxis: [
        {
          y: average,
          borderColor: 'red',
          label: {
            borderColor: 'red',
            style: {
              color: '#fff',
              background: 'red'
            },
            text: `${intl.formatMessage({ id: 'invoices.media' })}: ${average.toFixed(2)}`
          }
        }
      ]
    }
  };

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Chart options={options} series={series} type="area" height={400} />
    </Card>
  );
};

export default BajajAreaChartCard;
