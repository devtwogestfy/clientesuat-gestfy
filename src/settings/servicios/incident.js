import { backendAPI } from 'settings/app';

const GetInfoIncident = () => {
  const apiUrl = backendAPI;

  const createIncident = async (params = '') => {
    const response = await apiUrl.post('/portal/ticket/0', params);
    const data = response.data;
    return data;
  };

  const getIncidentsSummary = async () => {
    const response = await backendAPI.get('/portal/incidencias/datos');
    const data = response.data;
    return data;
  };

  const getSat = async () => {
    const response = await backendAPI.get('/portal/sat');
    const data = response.data;
    return data;
  };

  const getTickets = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
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
  };

  return {
    createIncident,
    getIncidentsSummary,
    getSat,
    getTickets
  };
};

export default GetInfoIncident;
