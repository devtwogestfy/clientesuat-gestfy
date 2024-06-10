import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import getCustomization from 'utils/customization';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: 'auto',
    zIndex: -1,
  },
  transparentPaper: {
    padding: theme.spacing(3),
    width: '100%',
    position: 'fixed',
    top: '50%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    background: 'hsla(0, 0%, 100%, 0.55)',
    backdropFilter: 'blur(30px)',
  },
}));

const Login = () => {
  const classes = useStyles();
  const customization = getCustomization();
  
  return (
    <AuthWrapper1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <AuthCardWrapper className={classes.transparentPaper}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Link to="#" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img src={ customization && customization.img_login ? customization.img_login : 'https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' }  className={classes.img} alt="" />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
