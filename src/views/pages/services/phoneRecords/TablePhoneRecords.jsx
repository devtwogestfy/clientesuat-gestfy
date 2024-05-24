import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { useTheme } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';

const columns = [
    {
        field: 'fecha',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Fecha',
        renderHeader: () => <FormattedMessage id="phones.table.date" />,
        width: 130
    },
    {
        field: 'origen',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Origen',
        renderHeader: () => <FormattedMessage id="phones.table.source" />,
        width: 130
    },
    {
        field: 'destino',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Destino',
        renderHeader: () => <FormattedMessage id="phones.table.dest" />,
        width: 130
    },
    {
        field: 'zona',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Zona',
        renderHeader: () => <FormattedMessage id="phones.table.zone" />,
        width: 200
    },
    {
        field: 'tipo',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Tipo',
        renderHeader: () => <FormattedMessage id="phones.table.type" />,
        width: 130
    },
    {
        field: 'segundos',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Unidades',
        renderHeader: () => <FormattedMessage id="phones.table.units" />,
        width: 130
    },
    {
        field: 'neto',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Coste',
        renderHeader: () => <FormattedMessage id="phones.table.cost" />,
        width: 130
    }
];

TablePhoneRecords.propTypes = {
    rows: PropTypes.array.isRequired
};

export default function TablePhoneRecords({ rows }) {
    const theme = useTheme();
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
                slots={{ noRowsOverlay: TableWithoutRecord }}
                pageSizeOptions={[5, 10]}
                getRowId={(row) => `${row.fecha}-${row.origen}-${row.destino}`}
                id="phoneTable"
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.secondary.dark,
                        color: '#fff'
                    }
                }}
            />
        </div>
    );
}
