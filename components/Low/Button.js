import { Fragment, useState, useEffect, Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, Fab, CircularProgress } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
/* icons */
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    marginTop: "32px",
    left: 0,
    right: 0
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
    margin: "auto",
    left: 0,
    right: 0
  },
  button: {
    margin: theme.spacing.unit,
    borderRadius: "2px",
    color: "#E7E7E7",
    backgroundColor: "#818181",
    "&:hover": {
      backgroundColor: "#686868"
    }
  },
  buttonAccented: {
    margin: theme.spacing.unit,
    borderRadius: "2px",
    color: "#E7E7E7",
    backgroundColor: "#2086C7",
    "&:hover": {
      backgroundColor: "#2172A6"
    }
  },
  buttonText: {
    margin: theme.spacing.unit,
    borderRadius: "2px",
    color: "#E7E7E7",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "rgba(231, 231, 231, 0.25) !important"
    }
  },
  buttonTextAccented: {
    margin: theme.spacing.unit,
    borderRadius: "2px",
    color: "#2086C7",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "rgba(33, 114, 166, 0.25) !important"
    }
  },
  disabled: {
    backgroundColor: "0",
    color: "rgba(231, 231, 231, 0.25) !important"
  },
  // estilos para los estados "Success" y "Failed"
  buttonSuccess: {
    backgroundColor: green[500],
    // evita que detrás se vea el texto
    "&:hover": {
      backgroundColor: green[500]
    }
  },
  buttonFailed: {
    backgroundColor: red[500],
    // evita que detrás se vea el texto
    "&:hover": {
      backgroundColor: red[500]
    }
  },
  buttonProgress: {
    color: "#E7E7E7",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  successIcon: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  errorIcon: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  labelSuccess: {
    color: green[500]
  },
  labelError: {
    color: red[500]
  },
  // estilos para los fabs
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "#818181",
    color: "#E7E7E7",
    "&:hover": {
      backgroundColor: "#686868"
    }
  },
  fabIcon: {
    color: "#E7E7E7"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
    color: "#E7E7E7"
  }
}));

/** Componente "Button". Permite mostrar un loader y tiene estilos para los estados "success" y "failed", entre
 * todas las diferentes configuraciones nativas de Material-UI/Button.
 * @param {string} label Texto que se muestra en el botón.
 * @param {function} onClick Evento que ejecutará el botón al hacer click.
 * @param {boolean} loading Si es true, carga un progress y deshabilita el botón, de lo contrario muestra texto.
 * @param {boolean} success Si es true, el botón muestra la animación de success.
 * @param {boolean} failed Si es true, el botón muestra la animación de failed.
 * @param {string} type Establece el tipo visual del botón: default y accented.
 * @param {string} variant Establece la variante visual del botón: round, extended. contained por default.
 * @param {boolean} disabled Si es true, deshabilita el botón.
 * @param {string} size Establece el tamaño del botón: small, medium, large.
 * @param {string} href provee al botón de un link en el caso que se requiera.
 * @param {Component} icon Icono para mostrar en la variante round y extended.
 */
function ButtonComponent(props) {
  const classes = useStyles();
  const buttonClassname = classNames({
    [classes.buttonSuccess]: props.success,
    [classes.buttonFailed]: props.failed
  });

  // Switchea entre el tipo de botón normal y los tipos (accented, text y textAccented),
  // seteando los estilos.
  const [type, setType] = useState("");
  useEffect(() => {
    switch (props.type) {
      case "accented":
        setType(classes.buttonAccented);
        break;
      case "text":
        setType(classes.buttonText);
        break;
      case "textAccented":
        setType(classes.buttonTextAccented);
        break;
      default:
        setType(classes.button);
        break;
    }
  }, [type]);

  /* código de button */
  const button = (
    <Button
      /* puede ser desactivado directamente o por loading */
      disabled={props.loading || props.disabled}
      href={props.href}
      size={props.size}
      /* Si no se asigna el prop variant, establece "contained" por default */
      variant={"contained"}
      className={buttonClassname + " " + type}
      /* sobreescribe los estilos según el estado del prop.success y prop.failed */
      classes={
        props.success
          ? { label: classes.labelSuccess }
          : props.failed
          ? { label: classes.labelError }
          : { disabled: classes.disabled }
      }
      onClick={() => props.onClick()}
    >
      {props.label}
      {/* alterna entre las animaciones de success y error según los estados recibidos */}
      {props.success && !props.loading ? (
        <CheckIcon size={22} className={classes.successIcon} />
      ) : props.failed && !props.loading ? (
        <ErrorIcon size={22} className={classes.errorIcon} />
      ) : (
        ""
      )}
      {props.loading && (
        <CircularProgress size={22} className={classes.buttonProgress} />
      )}
    </Button>
  );

  /* código de fab */
  const fab = (
    <Fab
      disabled={props.disabled}
      size={props.size}
      className={classes.fab}
      /* setea la variante para los fabs */
      variant={props.variant == "extended" ? "extended" : "round"}
    >
      {/* estiliza el icon en caso que sea "extendedFab" */}
      {props.variant == "round" ? (
        props.icon ? (
          React.cloneElement(props.icon, { className: classes.fabIcon })
        ) : (
          /* valor default en caso que no se pase el props.icon */
          <AddIcon size={22} className={classes.fabIcon} />
        )
      ) : (
        React.cloneElement(props.icon, { className: classes.extendedIcon })
      )}
      {/* Solo si es variante extended muestra texto en los Fabs */}
      {props.variant == "extended" ? props.label : ""}
    </Fab>
  );

  return (
    <Fragment>
      {/* según que variante se setee, muestra un button o un fab */}
      {props.variant == "round" || props.variant == "extended" ? fab : button}
    </Fragment>
  );
}

/* Props obligatorios para el componente botón */
ButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonComponent;
