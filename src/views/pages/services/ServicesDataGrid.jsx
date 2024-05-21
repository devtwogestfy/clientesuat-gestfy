// src/components/ServicesDataGrid.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import StatusColor from './StatusColor';
import ActionsButtons from './ActionsButtons';
import OptionsButtons from './OptionsButtons';

const columns = [
    {
        field: 'detalle',
        headerName: 'Detalle',
        width: 200,
        renderCell: (params) => {
            console.log(params);
            return (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <ActionsButtons
                        id={params.row.id}
                        estado={params.row.estado}
                        tipoId={params.row.tipoId}
                        aviso={params.row.aviso}
                        prepaid={params.row.prepaid}
                    />
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
        width: 120,
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
        headerName: 'Opciones',
        sortable: false,
        width: 260,
        renderCell: (params) => {
            return (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <OptionsButtons element={params.row} prepaidState={params.row.prepaid} />
                </Box>
            );
        }
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