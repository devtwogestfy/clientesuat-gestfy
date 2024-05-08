import React from 'react';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const ProfileViewPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Mi Perfil
            </Typography>
            <Card>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3} align="center">
                    <Avatar className={classes.avatar} src="/path/to/avatar.jpg" alt="Avatar" />
                    
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="h5" gutterBottom>
                      Información Personal
                    </Typography>
                    <Typography variant="body1">
                      Nombre: Juan Pérez
                    </Typography>
                    <Typography variant="body1">
                      Correo Electrónico: juan@example.com
                    </Typography>
                    <Typography variant="body1">
                      Teléfono: 1234567890
                    </Typography>
                    <Box mt={2}>
                      <Button variant="contained" color="primary" component={Link} to="/edit-profile" className={classes.button}>
                       Contacto
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfileViewPage;
