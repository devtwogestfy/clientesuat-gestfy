import { backendAPI } from "configuraciones/app";

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

  
}

export default apiLogin;
