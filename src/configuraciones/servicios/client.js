import { backendAPI } from 'configuraciones/app';

const GetInfoClient = () => {
    const apiUrl = backendAPI;

    const getClient = async () => {
        try {
            const response = await apiUrl.get('/portal/cliente');
            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(error.response || 'Network request failed');
        }
    };

    return {
        getClient
    };
};

export default GetInfoClient;
