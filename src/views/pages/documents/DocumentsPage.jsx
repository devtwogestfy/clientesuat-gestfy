/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/info-client';
import DocumentsDataGrid from './DocumentsDataGrid';

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

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DocumentsDataGrid rows={dataDocuments} downloadInvoice={descargarFactura} />
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default DocumentsPage;
