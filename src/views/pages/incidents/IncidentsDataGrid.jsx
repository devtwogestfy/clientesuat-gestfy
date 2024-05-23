import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { fDate } from 'utils/format-date';
import StatusColor from './StatusColor';
import ActionsButtons from './ActionsButtons';
import { Box } from '@mui/material';
const columns = [
    {
        field: 'notas',
        headerName: '',
        headerClassName: 'MuiDataGrid-columnHeaders',
        width: 50,
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
        width: 150
    },
    {
        field: 'alta',
        headerName: 'Alta',
        headerClassName: 'MuiDataGrid-columnHeaders',
        width: 150,
        valueGetter: (value, row) => `${fDate(row.alta) || ''}`
    },
    {
        field: 'texto',
        headerName: 'Descripción',
        headerClassName: 'MuiDataGrid-columnHeaders',
        width: 180
    },
    {
        field: 'servicio',
        headerName: 'Servicio',
        headerClassName: 'MuiDataGrid-columnHeaders',
        sortable: false,
        width: 250
    },
    {
        field: 'horas',
        headerName: 'Horas',
        headerClassName: 'MuiDataGrid-columnHeaders',
        sortable: false,
        width: 160
    },
    {
        field: 'estado_id',
        headerName: 'Estado',
        headerClassName: 'MuiDataGrid-columnHeaders',
        sortable: false,
        width: 160,
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
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.secondary.dark,
                        color: '#fff'
                    }
                }}
            />
        </Box>
    );
}
