/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import NumberInvoicesCard from './NumberInvoicesCard';
import LastInvoiceCard from './LastInvoiceCard';
import TotalDebtCard from './TotalDebtCard';
import InvoicesDataGrid from './InvoicesDataGrid';
import { fetchSummaryData, fetchData, descargarFactura } from 'services/invoiceService';

const InvoicesPage = () => {
  const [ultimafactura, setUltimafactura] = useState(null);
  const [pendiente, setPendiente] = useState(null);
  const [numeroFacturas, setNumeroFacturas] = useState(null);
  const [dataInvoices, setDataInvoices] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (isMounted) {
        try {
          const summaryData = await fetchSummaryData();
          setPendiente(summaryData.pendiente);
          setNumeroFacturas(summaryData.numeroFacturas);
          setUltimafactura(summaryData.ultimafactura);

          const invoices = await fetchData();
          setDataInvoices(invoices);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <NumberInvoicesCard title="Facturas" total={parseInt(numeroFacturas)} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <LastInvoiceCard title="Última Factura" total={parseFloat(ultimafactura)} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TotalDebtCard title="Deuda Total" total={parseFloat(pendiente)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <InvoicesDataGrid rows={dataInvoices} downloadInvoice={descargarFactura} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default InvoicesPage;
