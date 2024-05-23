/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// material-ui
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/info-client';
import ActionsButtons from './ActionsButtons';
import { fDate } from 'utils/format-date';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';

const DocumentsPage = () => {
    const [dataDocuments, setDataDocuments] = useState([]);
    const infoService = GetInfoService();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchData = async () => {
            infoService.getDocuments().then((documents) => {
                setDataDocuments(documents.items);
            });
        };
        fetchData();
    }, []);

    const columns = [
        {
            field: 'alta',
            headerName: 'Fecha',
            width: 500,
            valueGetter: (value, row) => `${fDate(row.alta) || ''}`
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 500
        },
        {
            field: 'age',
            headerName: 'Descargar Original',
            type: 'number',
            width: 110,
            renderCell: (params) => {
                return (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <ActionsButtons funcionOnClicDescargar={descargarFactura} factura_id={params.row.id} />
                    </Box>
                );
            }
        }
    ];

    const descargarFactura = async (id) => {
        infoService.downloadDocument(id).then((response) => {
            let f = blobToFile(response.file, response.filename);
            let fileUrl = URL.createObjectURL(f);

            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href', fileUrl);
            link.setAttribute('download', response.filename);
            link.click();
        });
    };

    const blobToFile = (theBlob, fileName) => {
        console.log(theBlob);
        console.log(fileName);
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
    };

    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'cebra-row' : '';
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowClassName={getRowClassName}
                            rows={dataDocuments}
                            columns={columns}
                            slots={{ noRowsOverlay: TableWithoutRecord }}
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
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default DocumentsPage;
