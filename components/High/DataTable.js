import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Head from './../Low/Table/Head';
import Body from './../Low/Table/Body';
import Pagination from './../Low/Table/Pagination';

function desc(a, b, orderBy) {
	return b[orderBy] === a[orderBy] ? 0 : b[orderBy] > a[orderBy] ? 1 : -1;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [ el, index ]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

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

function DataTable(props) {
	const classes = useStyles();
	const rows = props.data ? props.data : [];
	const columns = props.columns ? props.columns : [];
	const [ order, setOrder ] = React.useState('asc');
	const [ orderBy, setOrderBy ] = React.useState(0);
	const [ data ] = React.useState(rows);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChnageRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<Paper className={classes.root}>
			<Typography className={classes.title} variant="h6" id="tableTitle">
				{props.title}
			</Typography>
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableTitle">
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
					/>
				</Table>
			</div>
			<Pagination
				dataLength={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				handleChangePage={handleChangePage}
				handleChnageRowsPerPage={handleChnageRowsPerPage}
			/>
		</Paper>
	);
}

export default DataTable;
