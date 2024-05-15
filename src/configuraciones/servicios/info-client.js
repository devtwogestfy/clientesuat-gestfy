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

    const getInvoices = async (page = 1, limit = 25, sort = '', from = null, end = null, state = null) => {
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

    const getPhones = async (page = 1, limit = 25, sort = '') => {
        try {
            const params = {
                page: page.toString(),
                limit: limit.toString(),
                sort: sort
            };

            const response = await backendAPI.get('/portal/tels', { params });
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(error.response || 'Network request failed');
        }
    };

    const getServices = async (page = 1, limit = 25, sort = '') => {
        try {
            const params = {
                page: page.toString(),
                limit: limit.toString(),
                sort: sort
            };

            const response = await backendAPI.get('/portal/pservs', { params });
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(error.response || 'Network request failed');
        }
    };

    const descargarFactura = async (id) => {
        try {
            const response = await backendAPI.get('/portal/factura/' + id, { responseType: 'blob', observe: 'response' });
            let title = response.headers.get('content-disposition').split('filename=')[1].split(';')[0];
            title = title?.substring(1, title.length - 1);

            console.log(response);
            let data = {
                file: response.data,
                filename: title
            };
            return data;
        } catch (error) {
            console.log(error);
            throw new Error(error.response || 'Network request failed');
        }
    };

    const getDocuments = async (page = 1, limit = 25, sort = '') => {
        try {
            const params = {
                page: page.toString(),
                limit: limit.toString(),
                sort: sort
            };

            const response = await backendAPI.get('/portal/documentos', { params });
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(error.response || 'Network request failed');
        }
    };

    const downloadDocument = async (id) => {
        try {
            const response = await backendAPI.get('/portal/documentos/' + id, { responseType: 'blob', observe: 'response' });
            let title = response.headers.get('content-disposition').split('filename=')[1].split(';')[0];
            title = title?.substring(1, title.length - 1);

            console.log(response);
            let data = {
                file: response.data,
                filename: title
            };
            return data;
        } catch (error) {
            console.log(error);
            throw new Error(error.response || 'Network request failed');
        }
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

    return {
        getCliente,
        getInvoices,
        getInvoicesSummary,
        getDataInvoices,
        getIncidentsSummary,
        getSat,
        getTickets,
        getPhones,
        getServices,
        descargarFactura,
        getDocuments,
        downloadDocument,
        getBilling,
        getServicesList
    };
};

export default GetInfoService;
