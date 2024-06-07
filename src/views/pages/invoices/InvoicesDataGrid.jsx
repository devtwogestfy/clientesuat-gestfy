import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { FormattedMessage } from 'react-intl';
import Actions from './Actions';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { Badge, Button } from '@mui/material';
import { fDate } from 'utils/format-date';
import dataGridStyles from 'utils/dataGridStyles';
import PayDialog from './../../utilities/dialogs/PayDialog';
import InfoInvoice from 'settings/servicios/invoice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styles } from 'utils/stylesCustom';

const InvoicesDataGrid = ({ rows, downloadInvoice }) => {
  const theme = useTheme();
  const stylesTheme = dataGridStyles(theme);
  const [openPay, setOpenPay] = useState(false);
  const [openSuccessPay, setOpenSuccessPay] = useState(false);
  const [element, setElement] = useState([]);
  const infoInvoice = InfoInvoice();
  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Download',
      headerClassName: 'MuiDataGrid-columnHeaders',
      flex: 1,
      renderHeader: () => <FormattedMessage id="invoices.table.download" />,
      renderCell: (params) => {
        return (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Actions funcionOnClicDescargar={downloadInvoice} factura_id={params.row.id} />
          </Box>
        );
      }
    },
    {
      field: 'fechafactura',
      headerName: 'Date',
      headerClassName: 'MuiDataGrid-columnHeaders',
      flex: 1,
      renderHeader: () => <FormattedMessage id="invoices.table.date" />,
      valueGetter: (value, row) => `${fDate(row.fechafactura) || ''}`
    },
    {
      field: 'serie',
      headerName: 'Serie',
      headerClassName: 'MuiDataGrid-columnHeaders',
      type: 'number',
      flex: 1,
      renderHeader: () => <FormattedMessage id="invoices.table.serie" />
    },
    {
      field: 'numero',
      headerName: 'Number',
      headerClassName: 'MuiDataGrid-columnHeaders',
      sortable: false,
      flex: 1,
      renderHeader: () => <FormattedMessage id="invoices.table.number" />
    },
    {
      field: 'neto',
      headerName: 'Value',
      headerClassName: 'MuiDataGrid-columnHeaders',
      sortable: false,
      flex: 1,
      renderHeader: () => <FormattedMessage id="invoices.table.value" />,
      renderCell: (params) => {
        return (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Badge badgeContent={`€ ${params.row.neto}`} color="success"></Badge>
          </Box>
        );
      }
    },
    {
      field: 'cobrado',
      headerName: 'Pending',
      headerClassName: 'MuiDataGrid-columnHeaders',
      sortable: false,
      flex: 1,
      renderHeader: () => <FormattedMessage id="invoices.table.pending" />,
      renderCell: (params) => {
        return (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Badge badgeContent={`€ ${params.row.cobrado.toFixed(2)}`} color="error"></Badge>
          </Box>
        );
      }
    },
    {
      field: 'download',
      headerName: 'Actions',
      headerClassName: 'MuiDataGrid-columnHeaders',
      flex: 1,
      renderHeader: () => <FormattedMessage id="invoices.table.actions" />,
      renderCell: (params) => {
        return (
          <Button variant="contained" sx={styles.buttonPrimary} onClick={() => handleFormalizePrepay(params.row)}>
            <FormattedMessage id="invoices.table.pay" />
          </Button>
        );
      }
    }
  ];

  const handleFormalizePrepay = (row) => {
    setOpenPay(true);
    setElement(row);
  };
  const customization = JSON.parse(localStorage.getItem('user'));
  const onlinePaymentsProvider = customization.online_payments_provider;

  const handleClosePay = (type = 'bizum') => {
    console.log(type);
    if (type === 'cancel') {
      setOpenPay(false);
      return;
    }
    if (onlinePaymentsProvider == 1) {
      callRedsys(element.id, type);
    } else if (onlinePaymentsProvider == 2) {
      callCecabank(element.id, type);
    }
    setOpenPay(false);
  };

  const callRedsys = (factId, type) => {
    setOpenSuccessPay(true);
    const data = infoInvoice.startPurchase(factId, location.href, type).then((response) => {
      return response;
    });
  };

  const callCecabank = (factId, type) => {
    setOpenSuccessPay(true);
    const data = infoInvoice.startPurchaseCeca(factId, location.href, type).then((response) => {
      return response;
    });
  };

  return (
    <Box sx={stylesTheme.root}>
      <DataGrid
        getRowClassName={getRowClassName} // Aplicar estilos de cebra a las filas
        rows={rows}
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
        slots={{ noRowsOverlay: TableWithoutRecord }}
        sx={stylesTheme.dataGrid}
      />
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openSuccessPay}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <PayDialog openPay={openPay} handleClosePay={handleClosePay} />
    </Box>
  );
};

InvoicesDataGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  downloadInvoice: PropTypes.func.isRequired
};

export default InvoicesDataGrid;
