import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Head from './../Low/Table/Head';
import Body from './../Low/Table/Body';
import Pagination from './../Low/Table/Pagination';

// Recupera los elementos del array y el nombre a ordenar.
function desc(a, b, orderBy) {
	return b[orderBy] === a[orderBy] ? 0 : b[orderBy] > a[orderBy] ? 1 : -1;
}

// Ordena el array.
function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [ el, index ]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

// Decide que key se usa para el ordenamiento
function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		backgroundColor: '#424242'
	},
	table: {
		minWidth: 1020,
		color: '#E7E7E7 !important'
	},
	tableWrapper: {
		overflowX: 'auto'
	},
	title: {
		padding: '15px',
		color: '#E7E7E7 !important'
	}
}));

/**
 * Componente Tabla para datos dinámicos.
 * @param {array} data Conjunto de información para las rows.
 * @param {array} actions Conjunto de acciones.
 * @param {array} columns Conjunto de columnas para la tabla.
 * @param {string} title Titulo para la tabla. 
 * @param {object} config Configuraciones para la tabla 
 */
function DataTable(props) {
	const classes = useStyles();
	const rows = props.data;
	const columns = props.columns;
	const actualRows = props.config.rowsPerPageArray[0];
	const [ order, setOrder ] = useState(props.config.defaultSort);
	const [ orderBy, setOrderBy ] = useState(0);
	const [ data ] = useState(rows);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(actualRows);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	// Asigna el nombre para el ordenamiento.
	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}

	// Acción para asginar nueva pagina.
	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	// Acción que setea las filas por página.
	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<Paper className={classes.root}>
			<Typography className={classes.title} variant="h6" id="tableTitle">
				{props.title}
			</Typography>
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableComponent">
					<Head order={order} orderBy={orderBy} onRequestSort={handleRequestSort} columns={columns} />
					<Body
						getSorting={getSorting}
						stableSort={stableSort}
						order={order}
						orderBy={orderBy}
						page={page}
						rowsPerPage={rowsPerPage}
						emptyRows={emptyRows}
						data={data}
						actions={props.actions.list}
						actionsSet={props.actions.set}
					/>
				</Table>
			</div>
			<Pagination
				dataLength={data.length}
				rowsPerPage={rowsPerPage}
				rowsPerPageArray={props.config.rowsPerPageArray}
				page={page}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

DataTable.propTypes = {
	data: PropTypes.array.isRequired,
	actions: PropTypes.shape({
		list: PropTypes.array,
		set: PropTypes.object
	}),
	columns: PropTypes.array.isRequired,
	title: PropTypes.string,
	config: PropTypes.shape({
		rowsPerPageArray: PropTypes.array,
		defaultSort: PropTypes.string
	})
};

DataTable.defaultProps = {
	data: [],
	columns: [],
	title: 'Table Actions',
	actions: {
		list: null,
		set: null
	},
	config: {
		rowsPerPageArray: [ 5, 10, 20 ],
		defaultSort: 'asc'
	}
};

export default DataTable;
