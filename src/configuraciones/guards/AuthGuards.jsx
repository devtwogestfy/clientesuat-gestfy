import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {  useCookies } from 'react-cookie'

// eslint-disable-next-line react/prop-types
const AuthGuard = ({ component }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [cookies] = useCookies(['usuario']);

  useEffect(() => {
    setUsuarioAutenticado(cookies);
  }, [usuarioAutenticado]);

  console.log(Object.keys(cookies).length);
 
  // Si usuarioAutenticado es un token válido, renderiza el componente
  // Si no, redirige a la página de inicio de sesión
  return Object.keys(cookies).length  !== 0 ? <React.Fragment>{component}</React.Fragment> : <Navigate to="/login" />;
};

export default AuthGuard;
