import axios from 'axios';
import { func } from 'prop-types';
import React, { useState } from 'react';
import { showMessageDialog } from '../utils/messageDialog';

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
    if (error.response) {
      console.log(error.response);
      if (error.response.status === 401) {
        eliminarCookies();
        showMessageDialog('Error de autenticación', 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        window.location.href = '/login';
      } else if (error.response.status === 404) {
        showMessageDialog('Error', error.response.data);
      } else {
        showMessageDialog('Error', 'Algo salió mal. Por favor, inténtelo de nuevo más tarde.');
      }
    } else {
      showMessageDialog('Error', 'No se pudo conectar al servidor. Por favor, inténtelo de nuevo más tarde.');
    }
    return Promise.reject(error); // This is important
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
