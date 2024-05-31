import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getSessionId } from 'utils/sessionId';
// eslint-disable-next-line react/prop-types
const UnAuthRoutes = ({ component }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [cookies] = useCookies([getSessionId()]);

  console.log(cookies);
  useEffect(() => {
    setUsuarioAutenticado(cookies);
  }, [cookies, usuarioAutenticado]);
  console.log(cookies);
  if (Object.keys(cookies).length === 0) {
    // Aún estamos verificando la validez del token
    return <React.Fragment>{component}</React.Fragment>;
  }

  return <Navigate to="/" />;
};

export default UnAuthRoutes;
