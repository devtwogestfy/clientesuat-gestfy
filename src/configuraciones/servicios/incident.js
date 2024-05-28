import { backendAPI } from 'configuraciones/app';

const GetInfoIncident = () => {
  const apiUrl = backendAPI;

  const createIncident = async (params = '') => {
    const response = await apiUrl.post('/portal/ticket/0', params);
    const data = response.data;
    return data;
  };

  return {
    createIncident
  };
};

export default GetInfoIncident;
