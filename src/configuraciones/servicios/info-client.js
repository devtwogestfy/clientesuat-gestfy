import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const GetInfoService = () => {
  const [apiUrl] = useState(environment.apiUrl);

  const request = async (action, params = {}, connectTimeout = 10000) => {
    const options = {
      method: 'get',
      url: apiUrl + action,
      responseType: 'json',
      connectTimeout: connectTimeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, */*',
      },
      params: params,
    };

    try {
      const res = await CapacitorHttp.get(options);
      const data = await errorControl(res);
      return data;
    } catch (e) {
      if (e.hasOwnProperty('errorCode')) throw e;
      const error = await errorControl(e);
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

  const getInvoices = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
    let filter = '[{"property": "desde", "value":"' +
      from +
      '"}, {"property": "hasta", "value":"' +
      end +
      '"}, {"property": "estado", "value":"' +
      state +
      '"}]';
    const params = {
      'page': page.toString(),
      'limit': limit.toString(),
      'sort': sort,
      'filter': filter
    };
    return request('/appclientes/facturas', params);
  };

  // Añadir el resto de métodos aquí

  return {
    getCliente,
    getInvoices,
    // Añadir el resto de métodos aquí
  };
};

export default GetInfoService;
