import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import apiLogin from 'configuraciones/servicios/login';
import { useCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const theme = useTheme();
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['usuario']);
    const [openAlert, setOpenAlert] = useState(false);

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function iniciarSeccion(e) {
        e.preventDefault();

        const instanciaLogin = new apiLogin();

        instanciaLogin
            .iniciarSesion(userEmail, password)
            .then((response) => {
                // Manejar la respuesta exitosa aquí
                setCookie('usuario', response);
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                setOpenAlert(true);
                /*console.log(error);*/
            });
    }

    return (
        <>
            <Formik
                initialValues={{
                    userEmail: 'pedro',
                    password: 'gabriel',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    userEmail: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
            >
                {({ errors, handleBlur, isSubmitting, touched }) => (
                    <form noValidate onSubmit={iniciarSeccion} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="text"
                                value={userEmail}
                                name="userEmail"
                                onBlur={handleBlur}
                                onChange={(e) => setUserEmail(e.target.value)}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e) => setPassword(e.target.value)}
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
                                label="Password"
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
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    <FormattedMessage id="login.submit" />
                                </Button>
                            </AnimateButton>
                        </Box>
                        {openAlert && (
                            <Dialog severity="error" open={openAlert} onClose={handleCloseAlert}>
                                <DialogTitle>Error</DialogTitle>
                                <DialogContent>
                                    <p>Credenciales incorrectas. Por favor, inténtalo de nuevo.</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseAlert} color="primary">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        )}
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
