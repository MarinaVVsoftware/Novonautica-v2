import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { useState, useEffect } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#424242",
    padding: "2px 4px",
    alignItems: "center",
    height: theme.spacing.unit * 4,
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    fontSize: "14px",
    color: "#E7E7E7"
  },
  inputBase: {
    marginLeft: 8,
    flex: 1,
    color: "#E7E7E7",
    fontSize: "12px",
    width: "94%"
  },
  input: {
    padding: "8px 0 5px"
  }
}));

/** Textbox construido desde "InputBase", los errores los muestra con snackbars.
 * @param {string} label Texto que muestra como placeholder.
 * @param {boolean} password Oculta el texto escrito con asteriscos.
 * @param {function} onChange Función con la que se extraen los datos. USERNAME, CURRENT-PASSWORD
 */
function TextboxBase(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  // Escucha y manda el valor al Componente Padre.
  useEffect(() => {
    props.onChange(value);
  }, [value]);

  // Setea el valor del textbox en el state.
  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        className={classes.inputBase}
        placeholder={props.label}
        classes={{ input: classes.input }}
        value={value}
        type={props.password ? "password" : "text"}
        autoComplete={props.password ? "current-password" : "username"}
        onChange={handleChange}
        onClick={() => props.onChange(value)}
      />
    </Paper>
  );
}

export default TextboxBase;
