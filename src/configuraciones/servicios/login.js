import { backendAPI } from 'configuraciones/app';
import Cookies from 'js-cookie';

class apiLogin {
  iniciarSesion(usuario, clave) {
    let parametros = {
      username: usuario,
      pass: clave
    };
    return new Promise((resolve, reject) => {
      backendAPI
        .post('/portal/loginuser', parametros)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error.response);
        });
    });
  }

  isLoggedIn() {
    let cookieVal = Cookies.get('usuario');
    return cookieVal !== '' && cookieVal !== undefined && cookieVal !== null;
  }
}

export default apiLogin;
