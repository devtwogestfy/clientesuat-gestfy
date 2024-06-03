import { backendAPI } from 'configuraciones/app';

const GetInfoIncident = () => {
  const apiUrl = backendAPI;

  const createIncident = async (params = '') => {
    const response = await apiUrl.post('/portal/ticket/0', params);
    const data = response.data;
    return data;
  };

  const getIncidentsSummary = async () => {
    try {
      const response = await backendAPI.get('/portal/incidencias/datos');
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
  };

  const getSat = async () => {
    try {
      const response = await backendAPI.get('/portal/sat');
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
  };

  const getTickets = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
    try {
      let filter =
        '[{"property": "desde", "value":"' +
        from +
        '"}, {"property": "hasta", "value":"' +
        end +
        '"}, {"property": "estado", "value":"' +
        state +
        '"}]';

      const params = {
        page: page.toString(),
        limit: limit.toString(),
        sort: sort,
        filter: filter
      };

      const response = await backendAPI.get('/portal/ticketscli', { params });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
  };

  return {
    createIncident,
    getIncidentsSummary,
    getSat,
    getTickets
  };
};

export default GetInfoIncident;
