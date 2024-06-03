import { backendAPI } from 'configuraciones/app';

const GetInfoService = () => {
  const apiUrl = backendAPI;

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

  const getBilling = async (page = 1, limit = 25, sort = '') => {
    try {
      const params = {
        page: page.toString(),
        limit: limit.toString(),
        sort: sort
      };

      const response = await backendAPI.get('/portal/facturacion', { params });
      const data = response.data;

      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
  };

  const getServicesList = async (page = 1, limit = 25, sort = '') => {
    try {
      const params = {
        page: page.toString(),
        limit: limit.toString(),
        sort: sort
      };

      const response = await backendAPI.get('/portal/servicios', { params });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
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
    getCliente,
    getBilling,
    getServicesList,
    getBaseconfig,
    getBeforeConfig
  };
};

export default GetInfoService;
