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

    return {
        getPhoneRecord,
        getPrepayments
    };
};

export default GetInfoService;
