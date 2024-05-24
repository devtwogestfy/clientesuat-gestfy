import React from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { FormattedMessage } from 'react-intl';
import Actions from './Actions';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { Badge, Button } from '@mui/material';
import { fDate } from 'utils/format-date';

const InvoicesDataGrid = ({ rows, downloadInvoice }) => {
    const theme = useTheme();
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
                        <Badge badgeContent={`$ ${params.row.neto}`} color="success"></Badge>
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
                        <Badge badgeContent={`$ ${params.row.cobrado.toFixed(2)}`} color="error"></Badge>
                    </Box>
                );
            }
        },
        {
            field: 'download',
            headerName: '',
            headerClassName: 'MuiDataGrid-columnHeaders',
            flex: 1,
            renderCell: () => {
                return (
                    <Button variant="contained" color="primary">
                        <FormattedMessage id="invoices.table.pay" />
                    </Button>
                );
            }
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.secondary.dark,
                        color: '#fff'
                    }
                }}
            />
        </Box>
    );
};

InvoicesDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    downloadInvoice: PropTypes.func.isRequired
};

export default InvoicesDataGrid;
