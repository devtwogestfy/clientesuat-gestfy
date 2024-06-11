import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import * as Yup from 'yup';
import apiLogin from 'settings/servicios/login';
import { createSessionId, getSessionId } from 'utils/sessionId';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';

export const useAuthHelpers = () => {
  const intl = useIntl();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies([getSessionId()]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iniciarSeccion = async (values, { setSubmitting, setErrors }) => {
    const instanciaLogin = new apiLogin();
    try {
      await instanciaLogin.iniciarSesion(values.userEmail, values.password);
      setCookie(createSessionId(), uuidv4());
      setSubmitting(false);
      window.location.reload();
    } catch (error) {
      setErrors({ submit: intl.formatMessage({ id: 'login.errors.title' }) });
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().required(intl.formatMessage({ id: 'email.isRequired' })),
    password: Yup.string().required(intl.formatMessage({ id: 'password.isRequired' }))
  });

  return {
    theme,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    iniciarSeccion,
    validationSchema
  };
};
