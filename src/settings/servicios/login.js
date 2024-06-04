import { backendAPI } from 'settings/app';
import Cookies from 'js-cookie';
import { getSessionId } from 'utils/sessionId';
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
          console.log(response);
          resolve(response);
        })
        .catch(function (error) {
          console.log(error);
          reject(error.response);
        });
    });
  }

  isLoggedIn() {
    let cookieVal = Cookies.get(getSessionId());
    return cookieVal !== '' && cookieVal !== undefined && cookieVal !== null;
  }
}

export default apiLogin;
