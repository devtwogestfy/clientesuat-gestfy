import { backendAPI } from 'configuraciones/app';
import { getSessionId } from 'utils/sessionId';
import Cookies from 'js-cookie';

const GetInfoClient = () => {
  const apiUrl = backendAPI;

  const getClient = async () => {
    try {
      const response = await apiUrl.get('/portal/cliente');
      const data = response.data;
      return data;
    } catch (error) {
      Cookies.remove(getSessionId());
      console.log(error);
      //throw new Error(error.response || 'Network request failed');
    }
  };

  return {
    getClient
  };
};

export default GetInfoClient;
