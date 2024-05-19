/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/info-client';
import ActionsButtons from './ActionsButtons';
import { fDate } from 'utils/format-date';
import TableWithoutRecord from 'views/utilities/tables/withoutRecord';

const ColorBox = ({ bgcolor, title, data, dark }) => (
    <>
        <Card sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4.5,
                    bgcolor,
                    color: dark ? 'grey.800' : '#ffffff'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" color="inherit">
                        {title}
                    </Typography>
                )}
                {!title && <Box sx={{ p: 1.15 }} />}
            </Box>
        </Card>
        {data && (
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle2">{data.label}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
                        {data.color}
                    </Typography>
                </Grid>
            </Grid>
        )}
    </>
);

ColorBox.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    dark: PropTypes.bool
};

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
