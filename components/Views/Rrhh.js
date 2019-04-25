import React from 'react';
import Container from '../Low/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import DataTable from '../High/DataTable';
import { rrhh } from '../Handlers/ActionHandler';
import * as tableDummy from '../../dummy/table';

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
				<Typography variant="h6" className={classes.color}>
					Recursos Humanos
				</Typography>
			</Container>
			<Container>
				<DataTable
					data={tableDummy.data}
					actions={{ list: tableDummy.actions, set: rrhh }}
					columns={tableDummy.columns}
					title="Lista de Usuarios"
					config={{ rowsPerPageArray: [ 10, 20 ], defaultSort: 'desc' }}
				/>
			</Container>
		</div>
	);
}

export default Rrhh;
