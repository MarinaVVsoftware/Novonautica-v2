import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  error: {
    backgroundColor: "#f44336"
  },
  success: {
    backgroundColor: "#4caf50"
  },
  info: {
    backgroundColor: "#2196f3"
  },
  warning: {
    backgroundColor: "#ffc107"
  },
  default: {
    backgroundColor: "#9e9e9e"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

/* objeto que almacena los iconos */
const icons = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  default: null
};

/** Componente Snackbar. Muestra una notificación en la pantalla asociado
 *  a un evento cual sea.
 * @param {boolean} open El componente requiere recibir un state boolean del padre
 * @param {string} type Tipo de snackbar: { error, success, info, warning, default }.
 * @param {string} text Texto mostrado en el snackbar.
 * @param {string} horizontal La orientación del snackbar horizontal.
 * @param {string} vertical La orientación del snackbar vertical.
 * @param {string} autoHideDuration Tiempo de expiración.
 * @param {string} disableWindowBlurListener El snackbar expira incluso cuando la ventana no está en focus.
 */
function SnackbarComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(props.type);
  const Icon = icons[type];

  // función interna del snackbar para cerrarse a si mismo
  function HandleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  // segun el prop "type" cambia el tipo de snackbar
  useEffect(() => {
    setType(type);
  }, []);

  // escucha activa del padre para abrir el snackbar
  useEffect(() => {
    if (props.open) setOpen(props.open);
  }, [props.open]);

  return (
    <Snackbar
      disableWindowBlurListener={props.disableWindowBlurListener}
      autoHideDuration={props.autoHideDuration}
      anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
      open={open}
      onClose={HandleClose}
    >
      <SnackbarContent
        className={classes[type]}
        onClose={HandleClose}
        message={
          <span id="message-id" className={classes.message}>
            {type != "default" ? (
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
            ) : null}
            {props.text}
          </span>
        }
        action={[
          <IconButton
            key="close"
            className={classes.close}
            onClick={HandleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}

/* props obligatorios */
SnackbarComponent.propTypes = {
  open: PropTypes.bool
};

/* valores default */
SnackbarComponent.defaultProps = {
  type: "default",
  text: "snackbar component",
  horizontal: "left",
  vertical: "bottom",
  autoHideDuration: 3000,
  disableWindowBlurListener: false
};

export default SnackbarComponent;
