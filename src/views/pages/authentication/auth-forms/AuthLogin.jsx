import React from 'react';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormattedMessage } from 'react-intl';
import { useAuthHelpers } from 'hooks/useAuthHelpers';

const AuthLogin = ({ ...others }) => {
  const { theme, showPassword, handleClickShowPassword, handleMouseDownPassword, iniciarSeccion, validationSchema } = useAuthHelpers();
  return (
    <>
      <Formik
        initialValues={{
          userEmail: '',
          password: '',
          submit: null
        }}
        validationSchema={validationSchema}
        onSubmit={iniciarSeccion}
      >
        {({ values, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.userEmail && errors.userEmail)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">
                <FormattedMessage id="login.username_input" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.userEmail}
                name="userEmail"
                onBlur={handleBlur}
                onChange={handleChange}
                label={<FormattedMessage id="login.username_input" />}
                inputProps={{}}
              />
              {touched.userEmail && errors.userEmail && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.userEmail}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">
                <FormattedMessage id="login.password_input" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={<FormattedMessage id="login.password_input" />}
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  <FormattedMessage id="login.submit" />
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
