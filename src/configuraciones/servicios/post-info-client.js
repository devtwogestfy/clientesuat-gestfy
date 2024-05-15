import { backendAPI } from 'configuraciones/app';

const PostInfoService = () => {
    const apiUrl = backendAPI;

    const createIncident = async (values) => {
        try {
            const response = await apiUrl.post('/portal/ticket/0', values);
            const data = response.data;
            return data;
        } catch (error) {
            //console.log(error)
            throw new Error(error.response || 'Network request failed');
        }
    };

    return {
        createIncident
    };
};

export default PostInfoService;
