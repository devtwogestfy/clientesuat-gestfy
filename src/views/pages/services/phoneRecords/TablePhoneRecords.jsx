import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const columns = [
    { field: 'fecha', headerName: 'Fecha', width: 130 },
    { field: 'origen', headerName: 'Origen', width: 130 },
    { field: 'destino', headerName: 'Destino', width: 130 },
    { field: 'zona', headerName: 'Zona', width: 200 },
    { field: 'tipo', headerName: 'Tipo', width: 130 },
    { field: 'segundos', headerName: 'Unidades', width: 130 },
    { field: 'neto', headerName: 'Coste', width: 130 }
];

TablePhoneRecords.propTypes = {
    rows: PropTypes.array.isRequired
};

export default function TablePhoneRecords({ rows }) {
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
                pageSizeOptions={[5, 10]}
                getRowId={(row) => `${row.fecha}-${row.origen}-${row.destino}`}
                id="phoneTable"
            />
        </div>
    );
}
