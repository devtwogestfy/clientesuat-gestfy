import { backendAPI } from 'configuraciones/app';

const GetInfoService = () => {
    const apiUrl = backendAPI;

    const getPhoneRecord = async (id, type, from, end, incoming) => {
        const sentido = incoming ? 'entrante' : 'saliente';
        const filter = JSON.stringify([
            { property: 'id', value: id },
            { property: 'tipo', value: type },
            { property: 'desde', value: from },
            { property: 'hasta', value: end },
            { property: 'sentido', value: sentido }
        ]);

        const params = {
            filter: filter
        };

        try {
            const response = await apiUrl.get(`/portal/cdr`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching phone record:', error);
            throw error;
        }
    };

    const getPrepayments = async (page = 1, limit = 25, sort = '', servId = null) => {
        const filter = JSON.stringify([{ property: 'servicio_id', value: servId }]);

        const params = {
            filter: filter,
            page: page,
            limit: limit,
            sort: sort
        };

        try {
            const response = await apiUrl.get(`/portal/prepay-list`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching phone record:', error);
            throw error;
        }
    };

    const createPrepay = async (values) => {
        console.log(values);
        try {
            const response = await apiUrl.post('/prepaid-gen/cliente', values);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw new Error(error.response || 'Network request failed');
        }
    };

    const validatePrepay = async (id) => {
        try {
            console.log(id);
            const response = await apiUrl.post('/prepaid-validate/' + id);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw new Error(error.response || 'Network request failed');
        }
    };

    const cancelPrepay = async (id) => {
        try {
            const response = await apiUrl.put('/prepaid-cancel/' + id);
            const data = response.data;
            return data;
        } catch (error) {
            //console.log(error)
            throw new Error(error.response || 'Network request failed');
        }
    };

    const startPurchasePrepaid = async (factId = null, url = '', type = '', action = '') => {
        const params = {
            url: url,
            type: type,
            action: action
        };

        try {
            const response = await apiUrl.post(`/portal-payment-prepay/${factId}`, { params });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getRouterData = async (id) => {
        try {
            const response = await apiUrl.get('/portal/router/config/' + id);
            const data = response.data;
            return data;
        } catch (error) {
            //console.log(error)
            throw new Error(error.response || 'Network request failed');
        }
    };

    const updateRouterConfig = async (params = '', id = null) => {
        try {
            const response = await apiUrl.put('/portal/router/config/' + id, params);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw new Error(error.response || 'Network request failed');
        }
    };

    return {
        getPhoneRecord,
        getPrepayments,
        createPrepay,
        validatePrepay,
        cancelPrepay,
        startPurchasePrepaid,
        getRouterData,
        updateRouterConfig
    };
};

export default GetInfoService;
