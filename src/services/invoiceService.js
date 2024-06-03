import InfoInvoice from 'settings/servicios/invoice';

const infoInvoice = InfoInvoice();

const fetchSummaryData = async () => {
  try {
    const summaryData = await infoInvoice.getInvoicesSummary();
    return {
      pendiente: summaryData.pendiente,
      numeroFacturas: summaryData.numerofacturas,
      ultimafactura: summaryData.ultimafactura
    };
  } catch (error) {
    console.error('Error fetching summary data:', error);
    throw error;
  }
};

const fetchData = async () => {
  try {
    const invoices = await infoInvoice.getDataInvoices();
    return invoices.items;
  } catch (error) {
    console.error('Error fetching invoices data:', error);
    throw error;
  }
};

const descargarFactura = async (id) => {
  try {
    const response = await infoInvoice.descargarFactura(id);
    let f = blobToFile(response.file, response.filename);
    let fileUrl = URL.createObjectURL(f);

    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', response.filename);
    link.click();
  } catch (error) {
    console.error('Error downloading invoice:', error);
    throw error;
  }
};

const blobToFile = (theBlob, fileName) => {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
};

export { fetchSummaryData, fetchData, descargarFactura };
