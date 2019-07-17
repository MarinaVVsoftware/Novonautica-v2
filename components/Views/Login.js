import { useState, Fragment, useEffect } from "react";
import firebase from "../High/Login/Firebase";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import SnackbarComponent from "../Low/Snackbar";
import TextboxBase from "../Low/TextboxBase";
import ButtonComponent from "../Low/Button";
import Logo from "../High/Login/Logo";
import Router from "next/router";
import jsCookie from "js-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "100%"
  },
  loginPaper: {
    position: "absolute",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "260px",
    height: "260px",
    margin: "auto",
    top: theme.spacing.unit * -8,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    boxShadow: "none"
  }
}));

function Login(props) {
  const classes = useStyles();
  // flags y campos del login
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  // almacena el texto de los errores
  const [error, setError] = useState();

  // Handlers de estados
  const HandleSuccess = value => {
    setSuccess(value);
  };
  const HandleFailed = value => {
    setFailed(value);
  };
  const HandleError = value => {
    setError(value);
  };
  // Handlers de los textbox
  const HandleUser = value => {
    setUser(value);
    setFailed(false);
  };
  const HandlePassword = value => {
    setPassword(value);
    setFailed(false);
  };

  const params = {
    email: "",
    password: ""
  };

  const config = {
    mode: "cors",
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Maneja la lógica del submit del botón "iniciar sesión".
  const HandleClick = () => {
    StartLogin();
    if (IsLoginValidated()) {
      params.email = user;
      params.password = password;
      config.body = JSON.stringify(params);
      fetch("https://authcore-dev.novonautica.com/api/auth/login", config)
        .then(response => response.json())
        .then(data => {
          if (data.error === null) {
            if (typeof Storage !== "undefined") {
              jsCookie.set("token", data.token, { expires: 4 });
              jsCookie.set("user", params.email, { expires: 4 });
              setLoading(false);
              setSuccess(true);
              Router.push({
                pathname: "/"
              });
            }
          } else {
            throw new Error("Algo ha fallado");
          }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          setFailed(true);
          HandleFailed(true);
          HandleError("Algo ha fallado. Contacte a soporte");
        });
    }
  };

  // resetea los estados solo necesarios para el login
  function StartLogin() {
    setSuccess(false);
    setLoading(true);
    setFailed(false);
    setError("");
  }

  // valida el usuario y la contraseña
  function IsLoginValidated() {
    HandleFailed(false);
    HandleError("");

    // si alguno de los campos está vacío
    if (user == "" || password == "") {
      setLoading(false);

      HandleFailed(true);
      HandleError("Rellene todos los campos para iniciar sesión.");
      return false;
    }
    // hace validaciones regex para verificar que se insertaron correctamente los textos
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)) {
      if (/^[a-z0-9]+$/i.test(password)) return true;
      else {
        // si el regex contraseña falla
        setLoading(false);
        HandleFailed(true);
        HandleError(
          "El campo contraseña solo debe contener caracteres alfanuméricos."
        );
        return false;
      }
    } else {
      // si el regex de usuario falla
      setLoading(false);
      setFailed(true);
      setError("Inserte un correo válido.");
      return false;
    }
  }

  return (
    <Fragment>
      <Paper className={classes.loginPaper} elevation={2}>
        <Logo />
        <TextboxBase label={"usuario"} onChange={HandleUser} />
        <TextboxBase label={"contraseña"} onChange={HandlePassword} password />
        <ButtonComponent
          label={"iniciar sesion"}
          onClick={HandleClick}
          type={"accented"}
          size={"small"}
          loading={loading}
          success={success}
          failed={failed}
        />
      </Paper>
      <SnackbarComponent
        type={"error"}
        open={failed}
        text={error}
        close={failed}
      />
    </Fragment>
  );
}

export default Login;
