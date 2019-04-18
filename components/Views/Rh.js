import React from 'react';
import Container from '../Low/Container';
import CheckBox from '../Low/CheckBox';
import ComboBox from '../Low/ComboBox';

function Rh() {
	const checkBoxState = (newState) => {
		const checkBoxState = { ...newState };
		console.log(checkBoxState);
		return checkBoxState;
	};

	const comboBoxValue = (state) => {
		console.log(state);
	};

	return (
		<div>
			Test from RH module!
			<CheckBox values={[ 'Crear', 'Leer', 'Holo' ]} checkBoxState={checkBoxState} />
			<ComboBox options={[ 'Crear', 'Modificar', 'Eliminar' ]} title="Combobox" comboBoxValue={comboBoxValue} />
		</div>
	);
}

export default Rh;
