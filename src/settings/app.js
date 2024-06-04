import axios from 'axios';
import { func } from 'prop-types';

const config = {
  baseURL: `/api`
  //timeout: 15000,
  //headers: config
};
//comentario
// Crea una instacia de axios con url base
const backendAPI = axios.create(config);

backendAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      eliminarCookies();
      window.location.href = 'login';
    }
    return error;
  }
);

function eliminarCookies() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
export { backendAPI };
