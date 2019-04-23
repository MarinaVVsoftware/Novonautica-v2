import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import GridList from "@material-ui/core/GridList";
import Button from "../../Low/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%"
  }
}));

/** Componente que controla todos los controles en un único lugar "form".
 * Contiene todos los algoritmos para procesar los errores y validaciones.
 */
function FormComponent(props) {
  const classes = useStyles();
  const [structure, setStructure] = useState(props.structure);
  const [click, setClick] = useState(false);
  const [submit, setSubmit] = useState(false);
  let inputs = props.children;

  // función que se encarga del algoritmo para inyectar los handlers a cada componente
  const InyectProps = () => {
    // cloneElement -> clona el elemento y le añade props, incluso puede recibir childrens

    inputs = inputs.map((input, index) => {
      return React.cloneElement(input, {
        key: index,
        handleValue: HandlerValue,
        handleValid: HandleValid,
        handleErrors: HandleErrors
        // formClick: formClick,
        // dialogOpen: dialog
      });
    });
  };

  // Actualiza un control con su valor. Resetea los errores y su validez.
  const HandlerValue = (fieldName, value) => {
    structure[fieldName].errors = [];
    structure[fieldName].state = value;
    structure[fieldName].valid = true;
    ValidateControl(fieldName, value);
  };

  // Handler del estatus "valid" del control
  const HandleValid = fieldName => {
    return structure[fieldName].valid;
  };

  // Handler de los strings de errores
  const HandleErrors = fieldName => {
    return structure[fieldName].errors;
  };

  // Toma las reglas de validación del control a validar
  // y procede a introducirlas en su validador rectal
  const ValidateControl = (fieldName, value) => {
    structure[fieldName].errors = [];
    structure[fieldName].rules.forEach(rule => {
      // validación de reglas tipo regex
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value) && value != "") {
          structure[fieldName].errors.push(rule.message);
          structure[fieldName].valid = false;
        }
      }
      // validación de reglas tipo función
      else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          structure[fieldName].errors.push(rule.message);
          structure[fieldName].valid = false;
        }
      }
    });

    console.log(structure);
  };

  // revisa todos los controles de la estructura por alguno que no sea válido
  const IsFormValid = () => {
    let status = "true";
    Object.keys(structure).forEach(fieldName => {
      // valida que si está vacío el control marque error
      if (structure[fieldName].state == "") {
        structure[fieldName].errors.push("field is empty");
        structure[fieldName].valid = false;
        status = "false";
      }
      //si es inválido, setea falso
      if (!structure[fieldName].valid) {
        status = "false";
      }
    });

    console.log(structure);

    // marca un click en el botón para hacer trigger de eventos
    setClick(!click);
    return status;
  };

  // Handler del click del botón del form
  const HandleButtonClick = () => {
    return IsFormValid();
  };

  // Ejecuta la inyección de los props a cada control antes de su render.
  InyectProps();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <GridList cellHeight={"auto"} className={classes.gridList} cols={5}>
          {inputs}
        </GridList>
      </div>
      <Button
        label={"Send"}
        submitClick={HandleButtonClick}
        type={"accented"}
      />
    </React.Fragment>
  );
}

FormComponent.propTypes = {
  structure: PropTypes.object.isRequired
};

export default FormComponent;
