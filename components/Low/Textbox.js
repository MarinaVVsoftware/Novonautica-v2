import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  FilledInput,
  FormHelperText
} from "@material-ui/core";
import Label from "./Label";

const useStyles = makeStyles(theme => ({
  root: {
    "&$focus": {
      color: "#2086C7 !important"
    }
  },
  formControl: {
    width: "100%",
    backgroundColor: "#424242",
    "&:disabled": {
      backgroundColor: "green !important"
    },
    borderRadius: "4px"
  },
  filledInput: {
    color: "#E7E7E7"
  },
  filledInputDisabled: {
    backgroundColor: "rgba(0, 0, 0, 0.18)",
    /* Fix al hover, montaba un background diferente */
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.18)"
    },
    /* Fix al border radius */
    borderRadius: "4px"
  },
  inputLabel: {
    color: "#646464 !important",
    "&:focus": {
      color: "#2086C7 !important"
    }
  },
  inputLabelDisabled: {
    color: "#424242 !important"
  },
  labelFocused: {
    color: "#2086C7 !important"
  },
  labelFocusedError: {
    color: "#f44336 !important"
  },
  underline: {
    /* estilos del underline: despues de focus */
    "&:after": {
      borderBottom: "2px solid #2086C7"
    },
    /* bug con estilos. esto lo arrega */
    "&:before": {
      borderBottom: "#707070 !important"
    },
    /* reemplaza un estilo que causa bug */
    "&:hover:not(disabled):not(error):not(focused):before": {
      borderBottom: "1px #707070 !important"
    }
  },
  FormHelperText: {
    position: "relative",
    margin: "4px",
    marginLeft: "12px",
    width: "192px",
    backgroundColor: "transparent !important"
  }
}));

/** Componente "Textbox". Es un componente manejado por un High component para formar
 * formularios complejos. Contiene estados de error y validación.
 * @param {string} label Texto mostrado como título del textbox.
 * @param {string} name Nombre "estructural" del componente en el form.
 * @param {boolean} click Flag del click del button form.
 * @param {boolean} dialog booleano que usa para limpiar los estados a partir de un dialog event.
 * @param {boolean} disabled Deshabilita el componente.
 * @param {boolean} required Establece si es un formulario requerido del conjunto.
 * @param {string} id id y name del formulario.
 * @param {string} multiline Convierte el textbox en un textboxArea.
 * @param {int} rows La cantidad de rows que muestra dentro del textboxArea.
 * @param {int} rowsMax La cantidad máxima de rows del textboxArea.
 * @param {boolean} readOnly Convierte el textbox en "solo lectura".
 * @param {string} type Tipo del textfield
 */
function Textbox(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(true);
  const [errorLabel, setErrorLabel] = useState(props.handleErrors(props.name));

  // escucha cada que el formulario hace submit
  useEffect(() => {
    setValid(props.handleValid(props.name));
    setErrorLabel(props.handleErrors(props.name));
  }, [props.click]);

  // escucha cada que el diálogo se cierra, y limpia los estados
  useEffect(() => {
    if (!props.dialog) {
      setValue("");
      setValid(props.handleValid(props.name));
      setErrorLabel(props.handleErrors(props.name));
    }
  }, [props.dialog]);

  /* Cada que el input cambie, lo setea */
  const HandleChange = e => {
    setValue(e.target.value);
  };

  // Escucha y manda el valor al Form Padre
  useEffect(() => {
    props.handleValue(props.name, value);
  }, [value]);

  // Escucha por el estado de "valid"
  useEffect(() => {
    setValid(props.handleValid(props.name));
  }, [value]);

  // Escucha por los textos de error a mostrar
  useEffect(() => {
    setErrorLabel(props.handleErrors(props.name));
  }, [value]);

  return (
    <div>
      <FormControl
        variant="filled"
        className={classes.formControl}
        disabled={props.disabled}
        error={!valid}
        required={props.required}
      >
        {/* Label en la parte superior del textbox, aqui se anuncia el nombre del textbox */}
        <InputLabel
          classes={{ focused: classes.labelFocused, root: classes.inputLabel }}
          /* setea los estilos de focused y error, error depende del state "error" para verse */
        >
          {/* alterna entre el label normal y el de error (son dos textos diferentes) */}
          {props.label}
        </InputLabel>
        <FilledInput
          className={classes.filledInput}
          classes={{
            underline: classes.underline,
            disabled: classes.filledInputDisabled
          }}
          id={props.id}
          name={props.id}
          multiline={props.multiline}
          rows={props.rows}
          rowsMax={props.rowsMax}
          readOnly={props.readOnly}
          type={props.type}
          value={value}
          onChange={HandleChange}
        />
      </FormControl>
      {/* Maneja el texto de error cuando un error se presenta. */}
      {valid ? (
        ""
      ) : (
        <FormHelperText className={classes.FormHelperText} error>
          {errorLabel}
        </FormHelperText>
      )}
    </div>
  );
}

Textbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
};

export default Textbox;
