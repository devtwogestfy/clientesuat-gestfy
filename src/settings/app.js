import axios from 'axios';
import { showMessageDialog } from '../utils/messageDialog';

const config = {
  baseURL: '/api'
};

// Create an instance of axios with a base URL
const backendAPI = axios.create(config);

backendAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response);
      switch (error.response.status) {
        case 401:
          eliminarCookies();
          showMessageDialog('Error de autenticación', 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          window.location.href = '/login';
          break;
        case 404:
          showMessageDialog('Error', error.response.data);
          break;
        default:
          showMessageDialog('Error', 'Algo salió mal. Por favor, inténtelo de nuevo más tarde.');
          break;
      }
    } else {
      showMessageDialog('Error', 'No se pudo conectar al servidor. Por favor, inténtelo de nuevo más tarde.');
    }
    return Promise.reject(error); // Ensure promise rejection for further handling if needed
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
