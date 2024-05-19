import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';

const columns = [
    { field: 'inicio', headerName: 'F. Inicio', width: 130 },
    { field: 'fin', headerName: 'F. Fin', width: 130 },
    { field: 'fechapago', headerName: 'F. Pago', width: 150 },
    { field: 'importe', headerName: 'Importe', width: 150 },
    { field: 'estado', headerName: 'Estado', width: 130 }
];

PrepaysPage.propTypes = {
    rows: PropTypes.array.isRequired
};

export default function PrepaysPage({ rows }) {
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
            />
        </div>
    );
}
