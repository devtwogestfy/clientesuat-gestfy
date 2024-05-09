import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import AppWidgetSummary from './app-widget-summary';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { IconHome, IconUser, IconReceipt, IconAlertTriangleFilled, IconSettings, IconFileFilled } from '@tabler/icons-react';
import Buy from 'assets/icons/glass/ic_glass_buy.png';
import TotalServiceCard from './TotalServiceCard';
import GetInfoService from 'configuraciones/servicios/info-client';

const icons = {
  IconHome,
  IconUser,
  IconReceipt,
  IconAlertTriangleFilled,
  IconSettings,
  IconFileFilled
};

const columns = [
  {
    field: 'detalle',
    headerName: 'Detalle',
    width: 150,
  },
  {
    field: 'codigo',
    headerName: 'Código',
    width: 150,
  },
  {
    field: 'intservicio_id',
    headerName: 'Tipo',
    type: 'number',
    width: 110,
  },
  {
    field: 'nombre',
    headerName: 'Servicio',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.nombre || ''} - ${row.direccion || ''}`,
  },
  {
    field: 'estado',
    headerName: 'Estado',
    sortable: false,
    width: 160,
  },
  {
    field: 'opciones',
    headerName: 'opciones',
    sortable: false,
    width: 160,
  },
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

const ServicesPage = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [phones, setPhones] = useState(0);
  const [mobiles, setMobiles] = useState(0);
  const [ftth, setFtth] = useState(0);
  const [others, setOthers] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);


const infoService = GetInfoService();
 const fetchData = async () => {
    try {
      const [servicesResponse, phonesResponse] = await Promise.all([
        infoService.getServices(1, 500),
        infoService.getPhones(1, 500)
      ]);

      const servicesData = servicesResponse.items;
      const phonesData = phonesResponse.items;

      const newData = [...servicesData, ...phonesData];
      setData(newData);

      let phonesCount = 0;
      let mobilesCount = 0;
      let ftthCount = 0;
      let othersCount = 0;

      newData.forEach(element => {
        if (element.tipo === 'F') phonesCount++;
        if (element.tipo === 'M') mobilesCount++;
        if (!element.tipo && element.tecnologia === 1) ftthCount++;
        if ((element.tipo && (element.tipo !== 'F' && element.tipo !== 'M')) || (!element.tipo && element.tecnologia !== 1)) othersCount++;
      });

      setPhones(phonesCount);
      setMobiles(mobilesCount);
      setFtth(ftthCount);
      setOthers(othersCount);
      setLoaded(true);

      console.log(newData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TotalServiceCard 
                  title="FTTH"
                  total={ftth}
                  colorCard={ theme.palette.secondary.dark }
                  backgroundCard = { theme.palette.secondary[800] }
                  />
                </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TotalServiceCard 
                  title="Fijos"
                  total={phones}
                  colorCard={ theme.palette.primary.dark }
                  backgroundCard = { theme.palette.primary[800] }
                  />
              </Grid>
               <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TotalServiceCard 
                  title="Móviles"
                  total={mobiles}
                  colorCard={ theme.palette.success.dark }
                  backgroundCard = { theme.palette.success.light }
                  />
              </Grid>
               <Grid item xs={12} sm={6} md={4} lg={3}>
                 <TotalServiceCard 
                  title="Otros"
                  total={others}
                  colorCard={ theme.palette.error.dark }
                  backgroundCard = { theme.palette.error.light }
                  />
              </Grid>
              
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
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

export default ServicesPage;
