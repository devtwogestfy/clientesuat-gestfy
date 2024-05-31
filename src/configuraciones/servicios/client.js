import { backendAPI } from 'configuraciones/app';
import { getSessionId } from 'utils/sessionId';
import Cookies from 'js-cookie';

const GetInfoClient = () => {
  const apiUrl = backendAPI;

  const getClient = async () => {
    const response = await apiUrl.get('/portal/cliente');
    return response.data;
  };

  return {
    getClient
  };
};

export default GetInfoClient;
