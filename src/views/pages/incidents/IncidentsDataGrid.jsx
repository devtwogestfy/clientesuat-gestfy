import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { fDate } from 'utils/format-date';
import StatusColor from './StatusColor';
import ActionsButtons from './ActionsButtons';
import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import dataGridStyles from 'utils/dataGridStyles';

const columns = [
    {
        field: 'notas',
        headerName: '',
        headerClassName: 'MuiDataGrid-columnHeaders',
        flex: 1,
        renderCell: (params) => (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <ActionsButtons notas={params.row.notas} />
            </Box>
        )
    },
    {
        field: 'numero',
        headerName: 'Número',
        headerClassName: 'MuiDataGrid-columnHeaders',
        flex: 1,
        renderHeader: () => <FormattedMessage id="incidents.table.number" />
    },
    {
        field: 'alta',
        headerName: 'Alta',
        headerClassName: 'MuiDataGrid-columnHeaders',
        flex: 1,
        renderHeader: () => <FormattedMessage id="incidents.table.date" />,
        valueGetter: (value, row) => `${fDate(row.alta) || ''}`
    },
    {
        field: 'texto',
        headerName: 'Descripción',
        headerClassName: 'MuiDataGrid-columnHeaders',
        renderHeader: () => <FormattedMessage id="incidents.table.description" />,
        flex: 1
    },
    {
        field: 'servicio',
        headerName: 'Servicio',
        headerClassName: 'MuiDataGrid-columnHeaders',
        sortable: false,
        renderHeader: () => <FormattedMessage id="incidents.table.service" />,
        flex: 1
    },
    {
        field: 'horas',
        headerName: 'Horas',
        headerClassName: 'MuiDataGrid-columnHeaders',
        sortable: false,
        renderHeader: () => <FormattedMessage id="incidents.table.hours" />,
        flex: 1
    },
    {
        field: 'estado_id',
        headerName: 'Estado',
        headerClassName: 'MuiDataGrid-columnHeaders',
        sortable: false,
        flex: 1,
        renderHeader: () => <FormattedMessage id="incidents.table.status" />,
        renderCell: (params) => (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <StatusColor estado_id={params.row.estado_id} />
            </Box>
        )
    }
];

IncidentsDataGrid.propTypes = {
    rows: PropTypes.array.isRequired
};

export default function IncidentsDataGrid({ rows }) {
    const theme = useTheme();
    const styles = dataGridStyles(theme);
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    return (
        <Box sx={styles.root}>
            <DataGrid
                getRowClassName={getRowClassName}
                rows={rows}
                columns={columns}
                slots={{ noRowsOverlay: TableWithoutRecord }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                }}
                pageSizeOptions={[5, 10]}
                sx={styles.dataGrid}
            />
        </Box>
    );
}
