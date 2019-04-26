import React from 'react';
import Container from '../Low/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Form from '../High/Form/Form';
import Textbox from '../Low/Textbox';
import StructureForm from '../High/Form/StructureForm';
import rulesTypes from '../High/Form/RulesTypes';
import Button from '../Low/Button';
import Combobox from '../Low/ComboBox';

const useStyles = makeStyles((theme) => ({
	color: {
		color: '#e7e7e7 !important'
	}
}));
function Rrhh() {
	const classes = useStyles();

	let params = [
		{
			key: 'rolNameq',
			rules: rulesTypes.basicString
		},
		{
			key: 'rolNamew',
			rules: rulesTypes.basicString
		},
		{
			key: 'comboboxMagic',
			rules: null
		}
	];
	let structure = new StructureForm(params);

	const getResponse = (data) => {
		console.log(data);
	};

	const actions = [ <Button label={'Aceptar'} type={'default'} /> ];

	return (
		<div>
			<Container>
				<Typography variant="h6" className={classes.color}>
					Roles
				</Typography>
				<Form
					structure={structure}
					modalTitle={'Crear Usuario'}
					modalDescription={'El usuario se ha creado exitosamente.'}
					submitLabel={'guardar'}
					submitType={'accented'}
					getResponse={getResponse}
					modalActions={actions}
				>
					<Textbox label={'rolNameq'} name={'rolNameq'} />
					<Textbox label={'rolNamew'} name={'rolNamew'} />
					<Combobox options={[ 'a', 'v', 'f' ]} title={'comboboxMagic'} name={'comboboxMagic'} />
				</Form>
			</Container>
		</div>
	);
}

export default Rrhh;
