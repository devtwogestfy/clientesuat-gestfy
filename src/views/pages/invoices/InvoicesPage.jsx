

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
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
import EuroIcon from 'assets/icons/ic_euro.svg';
import GetInfoService from 'configuraciones/servicios/info-client';
import { Badge } from '@mui/material';
import Acciones from './Acciones';
import NumberInvoicesCard from './NumberInvoicesCard';

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
    field: 'id',
    headerName: 'Descargar',
    width: 150,
    editable: true,
    renderCell: (params)=>{
      return  (
        <Box sx={{width:'100%', textAlign:'center'}}>
          <Acciones />
        </Box>
      ) 
    }
  },
  {
    field: 'fechafactura',
    headerName: 'Fecha',
    width: 150,
    editable: true,
  },
  {
    field: 'serie',
    headerName: 'Serie',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'numero',
    headerName: 'Número',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'neto',
    headerName: 'Importe',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    renderCell: (params)=>{
      return  (
        <Box sx={{width:'100%', textAlign:'center'}}>
          <Badge badgeContent={`$ ${params.row.neto}`} color='success'></Badge>
        </Box>
      ) 
    }
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'cobrado',
    headerName: 'Pendiente',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    renderCell: (params)=>{
      return  (
        <Box sx={{width:'100%', textAlign:'center'}}>
          <Badge badgeContent={`$ ${params.row.cobrado.toFixed(2)}`} color='error'></Badge>
        </Box>
      ) 
    }
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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




const InvoicesPage = () => {
  const theme = useTheme();
  const [ultimafactura, setUltimafactura] = useState(null);
  const [pendiente, setPendiente] = useState(null);
  const [numeroFacturas, setNumeroFacturas] = useState(null);
  const [dataInvoices, setDataInvoices] = useState([]);

  const infoService = GetInfoService();
  infoService.getInvoicesSummary().then((summaryData) => {
 
    setPendiente(summaryData.pendiente)
    setNumeroFacturas(summaryData.numerofacturas)
    setUltimafactura(summaryData.ultimafactura)
    
  });

    const fetchData = async () => {
        infoService.getDataInvoices().then((invoices) => {
        setDataInvoices(invoices.items)
        console.log(invoices.items)
        })
      }
    useEffect(() => {
  
       fetchData();
  }, []);
  
 console.log(dataInvoices)
  return (
   
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <NumberInvoicesCard  />
                </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <AppWidgetSummary
                  title="Última Factura"
                  total={parseFloat(ultimafactura)}
                  color="info"
                  icon={<img alt="icon" src={EuroIcon} />}
                  />
              </Grid>
               <Grid item xs={12} sm={6} md={4} lg={4}>
                <AppWidgetSummary
                  title="Deuda Total"
                  total={parseFloat(pendiente)}
                  color="warning"
                  icon={<img alt="icon" src={EuroIcon} />}
                  />
              </Grid>
              
            </Grid>
          </SubCard>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={dataInvoices}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      
      </Grid>
    </MainCard>
  );
};

export default InvoicesPage;
