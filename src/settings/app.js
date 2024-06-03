import axios from 'axios';

//comentario
// Crea una instacia de axios con url base
export const backendAPI = axios.create({
    baseURL: `/api`
    //timeout: 15000,
    //headers: config
});
