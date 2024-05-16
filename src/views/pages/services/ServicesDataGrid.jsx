// src/components/ServicesDataGrid.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import StatusColor from './StatusColor';
import ActionsButtons from './ActionsButtons';

const columns = [
    {
        field: 'detalle',
        headerName: 'Detalle',
        width: 200,
        renderCell: (params) => {
            return (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <ActionsButtons service_id={params.row.id} tipo={params.row.tipo} />
                </Box>
            );
        }
    },
    {
        field: 'codigo',
        headerName: 'Código',
        width: 150
    },
    {
        field: 'intservicio_id',
        headerName: 'Tipo',
        type: 'number',
        width: 110,
        renderCell: (params) => {
            return <Box sx={{ width: '100%', textAlign: 'center' }}>{params.row.tipo}</Box>;
        }
    },
    {
        field: 'nombre',
        headerName: 'Servicio',
        sortable: false,
        width: 400,
        valueGetter: (value, row) => `${row.nombre || ''} ${row.direccion ? '-' + row.direccion : ''}`
    },
    {
        field: 'estado',
        headerName: 'Estado',
        sortable: false,
        width: 160,
        renderCell: (params) => {
            return (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <StatusColor estado_id={params.row.estado} />
                </Box>
            );
        }
    },
    {
        field: 'opciones',
        headerName: 'opciones',
        sortable: false,
        width: 160
    }
];

const ServicesDataGrid = ({ rows }) => {
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

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
            />
        </Box>
    );
};

ServicesDataGrid.propTypes = {
    rows: PropTypes.array.isRequired
};

export default ServicesDataGrid;
