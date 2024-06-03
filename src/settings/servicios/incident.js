import { backendAPI } from 'settings/app';

const apiUrl = backendAPI;

export const createIncident = async (params = '') => {
  const response = await apiUrl.post('/portal/ticket/0', params);
  const data = response.data;
  return data;
};

export const getIncidentsSummary = async () => {
  const response = await backendAPI.get('/portal/incidencias/datos');
  const data = response.data;
  return data;
};

export const getSat = async () => {
  const response = await backendAPI.get('/portal/sat');
  const data = response.data;
  return data;
};

export const getTickets = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
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
