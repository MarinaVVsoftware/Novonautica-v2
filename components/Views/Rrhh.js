import React from 'react';
import Container from '../Low/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import CheckBox from '../Low/CheckBox';
import ComboBox from '../Low/ComboBox';
import DataTable from '../High/DataTable';
import { rrhh } from '../Handlers/ActionHandler';
import Modal from '../High/Modal';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	color: {
		color: '#e7e7e7 !important'
	}
}));
function Rrhh() {
	const classes = useStyles();
	return (
		<div>
			<Container>
				<Typography variant="subtitle1" className={classes.color}>
					Recursos Humanos
				</Typography>
			</Container>
			<Container>
				<Typography variant="subtitle1" className={classes.color}>
					Recursos Humanos
				</Typography>
			</Container>
		</div>
	);
}

export default Rrhh;
