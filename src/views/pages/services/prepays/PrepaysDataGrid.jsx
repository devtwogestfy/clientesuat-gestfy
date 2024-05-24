import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';
import { useTheme } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';

const columns = [
    {
        field: 'inicio',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'F. Inicio',
        renderHeader: () => <FormattedMessage id="services.prepay.table.begin" />,
        flex: 1
    },
    {
        field: 'fin',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'F. Fin',
        renderHeader: () => <FormattedMessage id="services.prepay.table.end" />,
        flex: 1
    },
    {
        field: 'fechapago',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'F. Pago',
        renderHeader: () => <FormattedMessage id="services.prepay.table.paydate" />,
        flex: 1
    },
    {
        field: 'importe',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Importe',
        renderHeader: () => <FormattedMessage id="dashboard.showcase_invoices.value" />,
        flex: 1
    },
    {
        field: 'estado',
        headerClassName: 'MuiDataGrid-columnHeaders',
        headerName: 'Estado',
        renderHeader: () => <FormattedMessage id="services.prepay.table.status.title" />,
        flex: 1
    }
];

PrepaysPage.propTypes = {
    rows: PropTypes.array.isRequired
};

export default function PrepaysPage({ rows }) {
    const theme = useTheme();
    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
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
        </div>
    );
}
