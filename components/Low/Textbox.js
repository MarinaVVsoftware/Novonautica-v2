import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { FormControl, InputLabel, FilledInput } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    margin: theme.spacing.unit,
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
    color: "#646464"
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
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottom: "1px #707070 !important"
    }
  }
}));

/** Componente "Textbox". Es un componente manejado por un High component para formar
 * formularios complejos. Contiene estados de error y validación.
 * @param {string} label Texto mostrado como título del textbox.
 * @param {boolean} disabled Deshabilita el componente.
 * @param {boolean} error Setea el estado interno de "error".
 * @param {string} errorLabel Mensaje de error mostrado si el estado error es true. Reemplaza el label.
 * @param {boolean} required Establece si es un formulario requerido del conjunto.
 * @param {string} id id y name del formulario.
 * @param {string} multiline Convierte el textbox en un textboxArea.
 * @param {int} rows La cantidad de rows que muestra dentro del textboxArea.
 * @param {int} rowsMax La cantidad máxima de rows del textboxArea.
 * @param {boolean} readOnly Convierte el textbox en "solo lectura".
 */
function Textbox(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  /* Cada que el input cambie, lo setea */
  const HandleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div>
      <FormControl
        variant="filled"
        className={classes.formControl}
        disabled={props.disabled}
        error={props.error}
        required={props.required}
      >
        {/* Label en la parte superior del textbox, aqui se anuncia el nombre del textbox */}
        <InputLabel
          className={classes.inputLabel}
          /* mantiene el label estático si hay un error. */
          shrink={props.error}
          /* setea los estilos de focused y error, error depende del state "error" para verse */
          FormLabelClasses={
            !props.error
              ? {
                  focused: classes.labelFocused,
                  disabled: classes.inputLabelDisabled
                }
              : {
                  focused: classes.labelFocusedError,
                  disabled: classes.inputLabelDisabled
                }
          }
        >
          {/* alterna entre el label normal y el de error (son dos textos diferentes) */}
          {!props.error ? props.label : props.errorLabel}
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
          value={value}
          onChange={HandleChange}
        />
      </FormControl>
    </div>
  );
}

Textbox.propTypes = {
  label: PropTypes.string
};

export default Textbox;
