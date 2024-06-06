import React from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { FormattedMessage } from 'react-intl';
import ActionsButtons from './ActionsButtons';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { fDate } from 'utils/format-date';
import dataGridStyles from 'utils/dataGridStyles';

const DocumentsDataGrid = ({ rows, downloadInvoice }) => {
    const theme = useTheme();
    const styles = dataGridStyles(theme);
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    const columns = [
        {
            field: 'alta',
            headerName: 'Fecha',
            headerClassName: 'MuiDataGrid-columnHeaders',
            flex: 1,
            valueGetter: (value, row) => `${fDate(row.alta) || ''}`,
            renderHeader: () => <FormattedMessage id="documents.table.date" />
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            headerClassName: 'MuiDataGrid-columnHeaders',
            flex: 1,
            renderHeader: () => <FormattedMessage id="documents.table.name" />,
            valueGetter: (value, row) => row.nombre
        },
        {
            field: 'age',
            headerName: 'Serie',
            headerClassName: 'MuiDataGrid-columnHeaders',
            flex: 1,
            renderHeader: () => <FormattedMessage id="documents.download_og" />,
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

DocumentsDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    downloadInvoice: PropTypes.func.isRequired
};

export default DocumentsDataGrid;
