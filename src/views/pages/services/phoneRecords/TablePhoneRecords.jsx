import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { useTheme } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import dataGridStyles from 'utils/dataGridStyles';
import Box from '@mui/material/Box';

const columns = [
    {
        field: 'fecha',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Fecha',
        renderHeader: () => <FormattedMessage id="phones.table.date" />,
        flex: 1
    },
    {
        field: 'origen',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Origen',
        renderHeader: () => <FormattedMessage id="phones.table.source" />,
        flex: 1
    },
    {
        field: 'destino',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Destino',
        renderHeader: () => <FormattedMessage id="phones.table.dest" />,
        flex: 1
    },
    {
        field: 'zona',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Zona',
        renderHeader: () => <FormattedMessage id="phones.table.zone" />,
        flex: 1
    },
    {
        field: 'tipo',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Tipo',
        renderHeader: () => <FormattedMessage id="phones.table.type" />,
        flex: 1
    },
    {
        field: 'segundos',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Unidades',
        renderHeader: () => <FormattedMessage id="phones.table.units" />,
        flex: 1
    },
    {
        field: 'neto',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Coste',
        renderHeader: () => <FormattedMessage id="phones.table.cost" />,
        flex: 1
    }
];

TablePhoneRecords.propTypes = {
    rows: PropTypes.array.isRequired
};

export default function TablePhoneRecords({ rows }) {
    const theme = useTheme();
    const styles = dataGridStyles(theme);
    return (
        <Box sx={styles.root}>
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
                sx={styles.dataGrid}
            />
        </Box>
    );
}
