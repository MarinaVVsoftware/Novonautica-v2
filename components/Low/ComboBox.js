import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    width: "100%",
    backgroundColor: "#424242",
    "&:disabled": {
      backgroundColor: "green !important"
    },
    borderRadius: "4px"
  },
  filledInput: {
    color: "#E7E7E7 !important"
  },
  filledInputFocusesd: {
    color: "#2086C7 !important"
  },
  inputLabel: {
    color: "#646464"
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

/**
 * @param {array} options Array con todas las opciones. necesita recibir un objeto tipo {name, id}
 * para devolver correctamente el id del objeto
 * @param {string} title Titulo para el label de arriba
 * @param {string} name Nombre del combobox
 * @param {func} comboBoxValue Funcion para que el padre recupere el objecto actual
 * @param {bool} disabled Deshabilita el combobox
 * @param {bool} restart Resetea el combobox
 */
function Combobox(props) {
  const classes = useStyles();
  const [value, setValue] = useState(props.options[0].name);

  const handleChange = event => {
    setValue(event.target.value);
  };

  useEffect(() => {
    props.comboBoxValue(props.name, findId(value));
  }, [value]);

  useEffect(() => {
    setValue(props.options[0].name);
    props.comboBoxValue(props.name, findId(props.options[0].name));
  }, [props.restart]);

  /* Dado que las API's requieren id's y no strings, dentro de "options" 
  se trae el idy mediante esta función se busca el valor del id asociado 
  al valor seleccionado en el select */
  const findId = name => {
    for (let i = 0; i < props.options.length; i++)
      if (props.options[i].name == name) return props.options[i].id;
  };

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel
        htmlFor="filled-age-simple"
        className={classes.inputLabel}
        classes={{ focused: classes.filledInputFocusesd }}
      >
        {props.title}
      </InputLabel>
      <Select
        value={value}
        disabled={props.disabled ? true : false}
        onChange={handleChange}
        input={
          <FilledInput
            name="combobox"
            id="filled-combobox"
            className={classes.filledInput}
            className={classes.filledInput}
            classes={{
              underline: classes.underline
            }}
          />
        }
      >
        {props.options.map(option => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

Combobox.propType = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comboBoxValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Combobox;
