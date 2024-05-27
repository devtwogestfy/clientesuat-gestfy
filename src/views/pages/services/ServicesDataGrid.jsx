// src/components/ServicesDataGrid.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import StatusColor from './StatusColor';
import ActionsButtons from './ActionsButtons';
import OptionsButtons from './OptionsButtons';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { FormattedMessage } from 'react-intl';
import dataGridStyles from 'utils/dataGridStyles';

const ServicesDataGrid = ({ rows, updateData }) => {
    const theme = useTheme();
    const styles = dataGridStyles(theme);
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    const columns = [
        {
            field: 'detalle',
            headerClassName: 'MuiDataGrid-columnHeaders',
            headerName: 'Detalle',
            flex: 1,
            renderHeader: () => <FormattedMessage id="services.table.detail" />,
            renderCell: (params) => {
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
            headerClassName: 'MuiDataGrid-columnHeaders',
            headerName: 'Código',
            renderHeader: () => <FormattedMessage id="services.table.code" />,
            flex: 1
        },
        {
            field: 'intservicio_id',
            headerClassName: 'MuiDataGrid-columnHeaders',
            headerName: 'Tipo',
            type: 'number',
            flex: 1,
            renderHeader: () => <FormattedMessage id="services.table.type" />,
            renderCell: (params) => {
                return <Box sx={{ width: '100%', textAlign: 'center' }}>{params.row.tipo}</Box>;
            }
        },
        {
            field: 'nombre',
            headerClassName: 'MuiDataGrid-columnHeaders',
            headerName: 'Servicio',
            sortable: false,
            flex: 1,
            renderHeader: () => <FormattedMessage id="services.table.service" />,
            valueGetter: (value, row) => `${row.nombre || ''} ${row.direccion ? '-' + row.direccion : ''}`
        },
        {
            field: 'estado',
            headerClassName: 'MuiDataGrid-columnHeaders',
            headerName: 'Estado',
            sortable: false,
            flex: 1,
            renderHeader: () => <FormattedMessage id="services.table.state" />,
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
            headerClassName: 'MuiDataGrid-columnHeaders',
            headerName: 'Opciones',
            sortable: false,
            flex: 1,
            renderHeader: () => <FormattedMessage id="services.table.options" />,
            renderCell: (params) => {
                return (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <OptionsButtons element={params.row} updateData={updateData} />
                    </Box>
                );
            }
        }
    ];

    return (
        <Box sx={styles.root}>
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
                sx={styles.dataGrid}
            />
        </Box>
    );
};

ServicesDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    updateData: PropTypes.func.isRequired
};

export default ServicesDataGrid;
