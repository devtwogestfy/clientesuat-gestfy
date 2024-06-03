import { backendAPI } from 'settings/app';

const GetInfoDocument = () => {
  const apiUrl = backendAPI;

  const getDocuments = async (page = 1, limit = 25, sort = '') => {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sort: sort
    };

    const response = await backendAPI.get('/portal/documentos', { params });
    const data = response.data;
    return data;
  };

  const downloadDocument = async (id) => {
    const response = await backendAPI.get('/portal/documentos/' + id, { responseType: 'blob', observe: 'response' });
    let title = response.headers.get('content-disposition').split('filename=')[1].split(';')[0];
    title = title?.substring(1, title.length - 1);

    console.log(response);
    let data = {
      file: response.data,
      filename: title
    };
    return data;
  };

  return {
    getDocuments,
    downloadDocument
  };
};

export default GetInfoDocument;
