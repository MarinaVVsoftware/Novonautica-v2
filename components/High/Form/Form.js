import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import Button from '../../Low/Button';
import Modal from '../Modal';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		width: '100%',
		backgroundColor: '#212121'
	}
}));

/** Componente que controla todos los controles en un único lugar "form".
 * Contiene todos los algoritmos para procesar los errores y validaciones.
 * @param {Object} structure Objeto tipo "ScructureForm" con las reglas de forms.
 * @param {Elements} children Conjunto de formularios a renderear dentro del form.
 * @param {function} getResponse Función que obtiene la respuesta del submit.
 * @param {string} modalTitle Titulo del modal.
 * @param {string} modalDescription Descripción dentro del modal.
 * @param {Elements} modalActions Conjunto de botones a renderear como Actions del modal.
 * @param {string} submitLabel Texto del botón submit.
 * @param {string} submitType Tipo del botón.
 */
function FormComponent(props) {
	const classes = useStyles();
	const [ structure ] = useState(props.structure);
	const [ click, setClick ] = useState(false);
	const [ dialog, setDialog ] = useState(false);
	let inputs = props.children;
	let actions = props.modalActions;

	/* función que se encarga del algoritmo para inyectar 
  los handlers a cada componente */
	const InyectProps = () => {
		inputs = inputs.map((input, index) => {
			return React.cloneElement(input, {
				key: index,
				handleValue: HandlerValue,
				handleValid: HandleValid,
				handleErrors: HandleErrors,
				click: click,
				dialog: dialog
			});
		});
	};

	const CreateActions = () => {
		actions = actions.map((input, index) => {
			return React.cloneElement(input, {
				key: index,
				onClick: CloseDialog
			});
		});
	};

	/* Actualiza un control con su valor. Resetea los errores y su validez. */
	const HandlerValue = (fieldName, value) => {
		structure[fieldName].errors = [];
		structure[fieldName].state = value;
		structure[fieldName].valid = true;
		ValidateControl(fieldName, value);
	};

	/* Handler del estatus "valid" del control */
	const HandleValid = (fieldName) => {
		return structure[fieldName].valid;
	};

	/* Handler de los strings de errores */
	const HandleErrors = (fieldName) => {
		return structure[fieldName].errors;
	};

	/* Handler del click del botón del form */
	const HandleButtonClick = () => {
		return IsFormValid();
	};

	/* Handler para abrir el diálogo de confirmación */
	const OpenDialog = () => {
		setDialog(true);
	};

	/* Handler para cerrar el díalogo. Limpia el formulario. */
	const CloseDialog = () => {
		setDialog(false);
		ResetAllControls();
	};

	/* Toma las reglas de validación del control a validar
  y procede a introducirlas en su validador rectal */
	const ValidateControl = (fieldName, value) => {
		structure[fieldName].errors = [];
		structure[fieldName].rules.forEach((rule) => {
			// validación de reglas tipo regex
			if (rule.test instanceof RegExp) {
				if (!rule.test.test(value) && value != '') {
					structure[fieldName].errors.push(rule.message);
					structure[fieldName].valid = false;
				}
			} else if (typeof rule.test === 'function') {
				// validación de reglas tipo función
				if (!rule.test(value)) {
					structure[fieldName].errors.push(rule.message);
					structure[fieldName].valid = false;
				}
			}
		});
	};

	/* Revisa todos los controles de la estructura por alguno que no sea válido */
	const IsFormValid = () => {
		let status = true;
		Object.keys(structure).forEach((fieldName) => {
			// valida que si está vacío el control marque error
			if (structure[fieldName].state == '') {
				structure[fieldName].errors = [];
				structure[fieldName].errors.push('field is empty');
				structure[fieldName].valid = false;
				status = false;
			}
			//si es inválido, setea falso
			if (!structure[fieldName].valid) {
				status = false;
			}
		});

		if (status) GetData();

		// marca un click en el botón para hacer trigger de eventos
		setClick(!click);
		return status;
	};

	/* obtiene un arreglo de las keys principales de la estructura,
  y los usa para iterar toda la estructura y limpiarla. */
	const ResetAllControls = () => {
		Object.keys(structure).forEach((fieldName) => {
			structure[fieldName].errors = [];
			structure[fieldName].state = '';
			structure[fieldName].valid = true;
		});
	};

	/* Método que se encarga de obtener los valores 
  dentro de los formularios para su envío a una API. */
	const GetData = () => {
		var data = {};
		Object.keys(structure).forEach((fieldName) => {
			data[fieldName] = structure[fieldName].state;
		});
		props.getResponse(data);
	};

	// Ejecuta la inyección de los props a cada control antes de su render.
	// esta función debe ir hasta abajo antes del render. Se ejecuta ahí.
	InyectProps();
	CreateActions();

	return (
		<React.Fragment>
			{/* Modal que abre el button Submit */}
			<Modal open={dialog} onClose={CloseDialog} title={props.modalTitle} description={props.modalDescription}>
				{actions}
			</Modal>
			<div className={classes.root}>
				{/* Grid que acomoda los elementos */}
				<GridList cellHeight={'auto'} className={classes.gridList} cols={5}>
					{inputs}
				</GridList>
			</div>
			{/* Button Submit */}
			<Button
				label={props.submitLabel}
				submitClick={HandleButtonClick}
				openDialog={OpenDialog}
				dialog={dialog}
				type={props.submitType}
			/>
		</React.Fragment>
	);
}

FormComponent.propTypes = {
	structure: PropTypes.object.isRequired,
	getResponse: PropTypes.func.isRequired
};

export default FormComponent;
