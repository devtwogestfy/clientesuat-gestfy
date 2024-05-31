import GetInfoDocument from 'configuraciones/servicios/document';

const infoDocument = GetInfoDocument();

export const getDocuments = async () => {
  try {
    const documents = await infoDocument.getDocuments();
    return documents.items;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

export const downloadDocument = async (id) => {
  try {
    const response = await infoDocument.downloadDocument(id);
    const file = blobToFile(response.file, response.filename);
    const fileUrl = URL.createObjectURL(file);

    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', response.filename);
    link.click();
  } catch (error) {
    console.error('Error downloading document:', error);
  }
};

const blobToFile = (theBlob, fileName) => {
  return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
};
