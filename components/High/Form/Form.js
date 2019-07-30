import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "../../Low/Button";
import Modal from "../Modal";
import SnackbarComponent from "../../Low/Snackbar";
import useFetch2 from "../../../helpers/useFetchPromised";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    backgroundColor: "#212121"
  },
  gridList: {
    width: "100%",
    backgroundColor: "#212121"
  }
}));

/** Componente que controla todos los controles en un único lugar "form".
 * Contiene todos los algoritmos para procesar los errores y validaciones.
 * @param {Object} structure Objeto tipo "ScructureForm" con las reglas de forms.
 * @param {string} modalTitle Titulo del modal.
 * @param {string} modalDescription Descripción dentro del modal.
 * @param {string} modalTitleError Titulo del modal en caso de que el fetch retorne error.
 * @param {string} modalDescriptionError Descripción dentro del modal en caso que el fetch retorne error.
 * @param {string} submitLabel Texto del botón submit.
 * @param {string} submitType Tipo del botón.
 * @param {bool}   lg Acepta medida lg auto.
 * @param {Element} submitIcon Icono para el botón.
 * @param {Elements} modalActions Conjunto de botones a renderear como Actions del modal.
 * @param {function} getResponse Función que obtiene la respuesta del submit.
 * @param {Elements} children Conjunto de formularios a renderear dentro del form.
 */
function FormComponent(props) {
  const classes = useStyles();
  const [structure] = useState(props.structure);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [comboboxReset, setComboboxReset] = useState(false);
  const [click, setClick] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [fetchData, setFetchData] = useState({ code: null, response: null });
  let inputs = props.children;
  let actions = props.modalActions;
  let submitIcon = props.submitIcon;

  /* Escucha activa por la respuesta del fetch */
  useEffect(() => {
    if (fetchData.code != null) ProcessFetchResult();
  }, [fetchData]);

  /* función que se encarga del algoritmo para inyectar 
  los handlers a cada componente */
  const InyectProps = () => {
    inputs = inputs.map((input, index) => {
      /* Mediante un switch  hace una inyección diferente de props 
      por cada tipo de componente rendereable. */
      switch (input.type.name) {
        case "Textbox":
        case "DatePicker":
          return React.cloneElement(input, {
            key: index,
            handleValue: HandleTextboxValue,
            handleValid: HandleValid,
            handleErrors: HandleErrors,
            click: click,
            dialog: dialog
          });
        case "Combobox":
          return React.cloneElement(input, {
            key: index,
            handleValue: HandleComboboxValue,
            restart: comboboxReset
          });
      }
    });
  };

  /* Crea los botones dentro del dialog y les inyecta props
  para ser manejado por el form */
  const CreateActions = () => {
    actions = actions.map((input, index) => {
      return React.cloneElement(input, {
        key: index,
        onClick: CloseDialog
      });
    });
  };

  /* Actualiza un control con su valor. 
  Resetea los errores y su validez. */
  const HandleTextboxValue = (fieldName, value) => {
    setLoading(false);
    setFailed(false);
    setSuccess(false);
    structure[fieldName].errors = [];
    structure[fieldName].state = value;
    structure[fieldName].valid = true;
    ValidateControl(fieldName, value);
  };

  /* Obtiene el valor del combobox y lo devuelve. */
  const HandleComboboxValue = (fieldName, value) => {
    structure[fieldName].state = value;
  };

  /* Handler del estatus "valid" del control */
  const HandleValid = fieldName => {
    return structure[fieldName].valid;
  };

  /* Handler de los strings de errores */
  const HandleErrors = fieldName => {
    return structure[fieldName].errors;
  };

  /* Toma las reglas de validación del control a validar
  y procede a introducirlas en su validador rectal */
  const ValidateControl = (fieldName, value) => {
    structure[fieldName].errors = [];
    if (structure[fieldName].rules) {
      structure[fieldName].rules.forEach(rule => {
        // validación de reglas tipo regex
        if (rule.test instanceof RegExp) {
          if (!rule.test.test(value) && value != "") {
            structure[fieldName].errors.push(rule.message);
            structure[fieldName].valid = false;
          }
        } else if (typeof rule.test === "function") {
          // validación de reglas tipo función
          if (!rule.test(value)) {
            structure[fieldName].errors.push(rule.message);
            structure[fieldName].valid = false;
          }
        }
      });
    }
  };

  /* obtiene un arreglo de las keys principales de la estructura,
  y los usa para iterar toda la estructura y limpiarla. */
  const ResetAllControls = () => {
    Object.keys(structure).forEach(fieldName => {
      switch (structure[fieldName].type) {
        case "Textbox":
        case "DatePicker":
          structure[fieldName].errors = [];
          structure[fieldName].state = "";
          structure[fieldName].valid = true;
          break;
        case "Combobox":
          setComboboxReset(!comboboxReset);
          break;
        default:
          structure[fieldName].errors = [];
          structure[fieldName].valid = true;
          break;
      }
    });

    setLoading(false);
    setFailed(false);
    setSuccess(false);
  };

  /* Revisa todos los controles de la estructura por alguno que no sea válido */
  const IsFormValid = () => {
    let status = true;
    Object.keys(structure).forEach(fieldName => {
      // valida que si está vacío el control marque error
      if (structure[fieldName].state == "") {
        structure[fieldName].errors = [];
        structure[fieldName].errors.push("field is empty");
        structure[fieldName].valid = false;
        status = false;
      }
      //si es inválido, setea falso
      if (!structure[fieldName].valid) {
        status = false;
      }
    });

    if (!status) setFailed(true);

    // marca un click en el botón para hacer trigger de eventos
    setClick(!click);
    return status;
  };

  /* Método que se encarga de obtener los valores 
  dentro de los formularios para su envío a una API. */
  const GetData = () => {
    var data = {};
    Object.keys(structure).forEach((fieldName, index) => {
      data[fieldName] = structure[fieldName].state;
    });

    return props.getResponse(data);
  };

  /* Si la validación es true, se hace el fetch del submit y se setea el resultado */
  const FetchSubmit = formData => {
    let code = null;

    useFetch2(formData.url, formData.method, formData.body)
      .then(res => {
        code = res.status;
        /* Por alguna razón truena la app cuando el response viene vacío,
          este if lo maneja para evitar errores */
        if (res.status < 201 || res.status > 299) return res.json();
        else return null;
      })
      .then(response => setFetchData({ code: code, response: response }))
      .catch(error => {
        setFetchData({ code: 500, response: { error: error } });
      });
  };

  /* Handler del click del botón del form. */
  const HandleButtonClick = () => {
    const valid = IsFormValid();

    if (valid) {
      setLoading(true);
      FetchSubmit(GetData());
    } else {
      setFailed(true);
      setErrorMessage("Datos inválidos. Revise los datos ingresados.");
    }
  };

  /* obtiene la respuesta del fetch hecha por el botón y procesa el contenido
  para validar errores y respuestas */
  const ProcessFetchResult = () => {
    setLoading(false);

    switch (fetchData.code) {
      case 200:
      case 201:
      case 202:
      case 204:
        setSuccess(true);
        OpenDialog();
        break;
      case 400:
        setFailed(true);
        setErrorMessage(fetchData.response.error);
        break;
      case 401:
        setFailed(true);
        setErrorMessage("Acceso no autorizado. Contacte a soporte.");
        break;
      case 403:
      case 404:
      case 405:
        setFailed(true);
        setErrorMessage(
          "Novocore ha rechazado la request. Contacte a soporte."
        );
        break;
      case 406:
        setFailed(true);
        setErrorMessage(
          "No se enviaron los datos correctamente. Contacte a soporte."
        );
        break;
      default:
        setFailed(true);
        setErrorMessage("Algo ha fallado en novonautica. Contacte a soporte.");
        break;
    }
  };

  /* Limpia el estado del error. Lo maneja el snackbar */
  const CleanError = () => setFailed(false);

  /* Handler para abrir el diálogo de confirmación */
  const OpenDialog = () => {
    setDialog(true);
    setLoading(false);
    setSuccess(true);
  };

  /* Handler para cerrar el díalogo. Limpia el formulario. */
  const CloseDialog = () => {
    setDialog(false);
    ResetAllControls();
  };

  /* Ejecuta la inyección de los props a cada control antes de su render.
  Esta función debe ir hasta abajo antes del render. Se ejecuta aquí. */
  InyectProps();
  CreateActions();
  return (
    <React.Fragment>
      {/* Modal que abre el button Submit */}
      <Modal
        open={dialog}
        onClose={CloseDialog}
        title={!failed ? props.modalTitle : props.modalTitleError}
        description={
          !failed ? props.modalDescription : props.modalDescriptionError
        }>
        {actions}
      </Modal>
      <div className={classes.root}>
        {/* Grid que acomoda los elementos */}
        <Grid container spacing={2}>
          {inputs.map((input, index) => (
            <Grid item lg={props.lg ? true : false} md={6} xs={12} key={index}>
              {input}
            </Grid>
          ))}
        </Grid>
        {/* Button Submit */}
        <Button
          label={props.submitLabel}
          handleButtonClick={HandleButtonClick}
          dialog={dialog}
          type={props.submitType}
          loading={loading}
          success={success}
          failed={failed}
          icon={submitIcon}
        />
      </div>

      <SnackbarComponent
        type={"error"}
        text={errorMessage}
        open={failed}
        onClose={CleanError}
        vertical={"bottom"}
        horizontal={"left"}
      />
    </React.Fragment>
  );
}

FormComponent.propTypes = {
  structure: PropTypes.object.isRequired,
  getResponse: PropTypes.func.isRequired
};

export default FormComponent;
