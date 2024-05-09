import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { backendAPI } from "configuraciones/app";

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

   const getInvoicesSummary = async () => {

    try {
      const response = await backendAPI.get('/portal/facturas/datos');
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response || 'Network request failed');
    }

  };

  const getDataInvoices = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
  
     try {
     
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

      const response = await backendAPI.get('/appclientes/facturas', { params });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }
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
  }

   const getTickets = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {

     try {
     
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

      const response = await backendAPI.get('/portal/ticketscli', { params });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response || 'Network request failed');
    }

  }

  return {
    getCliente,
    getInvoices,
    getInvoicesSummary,
    getDataInvoices,
    getIncidentsSummary,
    getSat,
    getTickets
    // Añadir el resto de métodos aquí
  };
};

export default GetInfoService;