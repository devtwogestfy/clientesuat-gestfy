import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GetInfoService from 'configuraciones/servicios/info-client';
import NumberInvoicesCard from '../invoices/NumberInvoicesCard';
import LastInvoiceCard from '../invoices/LastInvoiceCard';
import TotalDebtCard from '../invoices/TotalDebtCard';
import InvoicesDataGrid from '../invoices/InvoicesDataGrid';

const InvoiceTabPanel = () => {
  const [ultimafactura, setUltimafactura] = useState(null);
  const [pendiente, setPendiente] = useState(null);
  const [numeroFacturas, setNumeroFacturas] = useState(null);
  const [dataInvoices, setDataInvoices] = useState([]);

  const infoService = GetInfoService();

  const fetchSummaryData = async () => {
    try {
      const summaryData = await infoService.getInvoicesSummary();
      setPendiente(summaryData.pendiente);
      setNumeroFacturas(summaryData.numerofacturas);
      setUltimafactura(summaryData.ultimafactura);
    } catch (error) {
      console.error('Error fetching summary data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const invoices = await infoService.getDataInvoices();
      setDataInvoices(invoices.items);
      console.log(invoices.items);
    } catch (error) {
      console.error('Error fetching invoices data:', error);
    }
  };

  const descargarFactura = async (id) => {
    try {
      const response = await infoService.descargarFactura(id);
      let f = blobToFile(response.file, response.filename);
      let fileUrl = URL.createObjectURL(f);

      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', fileUrl);
      link.setAttribute('download', response.filename);
      link.click();
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };

  const blobToFile = (theBlob, fileName) => {
    console.log(theBlob);
    console.log(fileName);
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
  };

  useEffect(() => {
    let isMounted = true; // bandera para evitar actualizaciones en componentes desmontados

    const loadData = async () => {
      if (isMounted) {
        await fetchSummaryData();
        await fetchData();
      }
    };

    loadData();

    return () => {
      isMounted = false; // se desmonta el componente, se evita actualización del estado
    };
  }, []);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Grid container spacing={gridSpacing} direction="column">
            <Grid item xs={12}>
              <NumberInvoicesCard title="Facturas" total={parseInt(numeroFacturas)} />
            </Grid>
            <Grid item xs={12}>
              <LastInvoiceCard title="Última Factura" total={parseFloat(ultimafactura)} />
            </Grid>
            <Grid item xs={12}>
              <TotalDebtCard title="Deuda Total" total={parseFloat(pendiente)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
          <InvoicesDataGrid rows={dataInvoices} downloadInvoice={descargarFactura} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default InvoiceTabPanel;
