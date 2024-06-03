import { backendAPI } from 'settings/app';
import { getSessionId } from 'utils/sessionId';
import Cookies from 'js-cookie';

const GetInfoClient = () => {
  const apiUrl = backendAPI;

  const getClient = async () => {
    const response = await apiUrl.get('/portal/cliente');
    return response.data;
  };

  const request = async (action, params = {}, connectTimeout = 10000) => {
    const options = {
      method: 'get',
      url: apiUrl + action,
      responseType: 'json',
      connectTimeout: connectTimeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, */*'
      },
      params: params
    };

    try {
      const res = await CapacitorHttp.get(options);
      const data = await errorControl(res);
      return data;
    } catch (e) {
      if (e.newError) throw e;
      newError.errorCode = ERROR_REQUEST_STATUS.ERROR_CODE_DEFAULT;
      throw newError;
    }
  };

  const errorControl = async (response) => {
    if (response.error) {
      if (response.status === ERROR_REQUEST_STATUS.ERROR_CODE_NOT_LOGGED) {
        newError.errorCode = ERROR_REQUEST_STATUS.ERROR_CODE_NOT_LOGGED;
      } else {
        newError.errorCode = ERROR_REQUEST_STATUS.ERROR_CODE_DEFAULT;
      }
      throw newError;
    }
    return response.data;
  };

  const getCliente = async () => {
    return request('/appclientes/cliente');
  };

  const getBeforeConfig = async () => {
    const response = await backendAPI.get('/portal/defaultconfig/1');
    return response.data;
  };

  const getBaseconfig = async () => {
    const response = await backendAPI.get('/portal/baseconfig');
    return response.data;
  };

  return {
    getClient,
    getCliente,
    getBaseconfig,
    getBeforeConfig
  };
};

export default GetInfoClient;
