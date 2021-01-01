import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/authentication/authContext';
import Logo from '../../images/mui.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MUI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  //Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //En caso que el password o user no exista
  useEffect(() => {

    if (autenticado) {
        console.log("ENTRA");
        props.history.push('/admin');
    }

    if (mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //State para iniciar sesion
  const [usuario, setUsuario] = useState ({
    email:'',
    password:''
  });

  //Extraer de usuario
  const {email, password} = usuario;

  const onChange = (e) =>{
    setUsuario({
        ...usuario,
        [e.target.name] : e.target.value
    })
  };

  //Cuando el usuaro quiere iniciar sesion
  const onSubmit = e => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (email.trim() === '' || password.trim() === '') {
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
    }

    //Pasarlo al action
    iniciarSesion({ email, password })
  }

  return (
    <Container component="main" maxWidth="xs">
      { alerta ? ( <div className = {`alerta ${alerta.categoria}`}> { alerta.msg }</div>) : null }
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} width = "60%"/>
        <form className={classes.form} noValidate onSubmit = {onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            autoFocus
            value = {email}
            onChange = {onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value = {password}
            onChange = {onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            className={classes.submit}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
