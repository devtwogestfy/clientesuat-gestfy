import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DocumentsDataGrid from './DocumentsDataGrid';
import CircularWithValueLabel from 'views/utilities/CircularProgressWithLabel';
import 'assets/css/Spinner.css';
import { getDocuments, downloadDocument } from 'services/documentService';

const DocumentsPage = () => {
  const [dataDocuments, setDataDocuments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const documents = await getDocuments();
      setDataDocuments(documents);
      setLoading(false);
    };
    fetchData();
  }, []);

  const descargarFactura = async (id) => {
    await downloadDocument(id);
  };

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          {isLoading ? (
            <div className="center-spinner">
              <CircularWithValueLabel color="secondary" />
            </div>
          ) : (
            <DocumentsDataGrid rows={dataDocuments} downloadInvoice={descargarFactura} />
          )}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DocumentsPage;
