import React from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { FormattedMessage } from 'react-intl';
import ActionsButtons from './ActionsButtons';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { fDate } from 'utils/format-date';

const DocumentsDataGrid = ({ rows, downloadInvoice }) => {
    const theme = useTheme();
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    const columns = [
        {
            field: 'alta',
            headerName: 'Fecha',
            headerClassName: 'MuiDataGrid-columnHeaders',
            width: 500,
            valueGetter: (value, row) => `${fDate(row.alta) || ''}`,
            renderHeader: () => <FormattedMessage id="invoices.table.download" />
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            headerClassName: 'MuiDataGrid-columnHeaders',
            width: 150,
            renderHeader: () => <FormattedMessage id="invoices.table.date" />,
            valueGetter: (value, row) => `${fDate(row.fechafactura) || ''}`
        },
        {
            field: 'age',
            headerName: 'Serie',
            headerClassName: 'MuiDataGrid-columnHeaders',
            width: 300,
            renderHeader: () => <FormattedMessage id="invoices.table.serie" />,
            renderCell: (params) => {
                return (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <ActionsButtons funcionOnClicDescargar={downloadInvoice} factura_id={params.row.id} />
                    </Box>
                );
            }
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowClassName={getRowClassName}
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

DocumentsDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    downloadInvoice: PropTypes.func.isRequired
};

export default DocumentsDataGrid;
