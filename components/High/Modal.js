import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  backgroundModal: {
    backgroundColor: "#0000008a"
  },
  modal: {
    backgroundColor: "#303030",
    color: "#E7E7E7 !important"
  },
  paper: {
    backgroundColor: "#303030"
  },
  color: {
    color: "#E7E7E7 !important"
  },
  appBar: {
    backgroundColor: "#2086C7"
  }
});

/**
 * Simple modal.
 * 1.- Declarar un Hook "open" con su funcion y establecerlo en falso.
 * 2.- Declarar una función handleClickOpen(), dentro la función del hook "open" tendrá true.
 * 3.- Declarar una función handleClose(), dentro la función del hook "open" tendrá false.
 * @param {bool} open Bool para detectar cuando esta y no abierto.
 * @param {func} onClose Función que setea el hook a falso.
 * @param {string} title Titulo para el modal.
 * @param {string} description Descripción que se mostrará en el body del modal.
 * @param {object} children Componentes de tipo botón que forman parte de los Actions.
 * @param {*} props Props por defecto del componente Dialog de material UI, excepto las funciones.
 */
function Modal(props) {
  const classes = useStyles();
  const { onClose, ...other } = props;

  function handleClose() {
    onClose();
  }
  
  return (
    <Dialog
      aria-labelledby="Dialog"
      onClose={handleClose}
      {...other}
      classes={{
        root: classes.backgroundModal,
        paperFullScreen: classes.modal
      }}
      PaperProps={{ className: classes.paper }}
    >
      {props.fullScreen ? (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant={"h6"} color="inherit" className={classes.flex}>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <Fragment>
          {/* Titulo */}
          <DialogTitle
            id="dialog-title"
            className={classes.modal}
            disableTypography
          >
            <Typography
              variant={"h6"}
              color="inherit"
              classes={{ root: classes.color }}
            >
              {props.title}
            </Typography>
          </DialogTitle>
          {/* Content */}
          <DialogContent className={classes.modal}>
            <DialogContentText
              id="alert-dialog-description"
              className={classes.modal}
            >
              {props.description}
            </DialogContentText>
          </DialogContent>
          {/* Actions */}
          <DialogActions className={classes.modal}>
            {props.children}
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  title: "New Window"
};

export default Modal;
