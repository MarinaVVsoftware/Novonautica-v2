import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
	tableCell: {
		color: '#E7E7E7 !important',
		borderBottom: '1px solid rgba(112, 112, 112, 0.23) !important'
	}
}));

function Body(props) {
	const classes = useStyles();
	const { stableSort, getSorting, order, orderBy, page, rowsPerPage, emptyRows, data } = props;

	const dataRows = (data) =>
		data.map((row, index) => (
			<TableCell className={classes.tableCell} key={row}>
				{row}
			</TableCell>
		));

	return (
		<TableBody>
			{stableSort(data, getSorting(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((n, i) => {
					return <TableRow key={n[0]}>{dataRows(n)}</TableRow>;
				})}
			{emptyRows > 0 && (
				<TableRow style={{ height: 49 * emptyRows }}>
					<TableCell colSpan={6} />
				</TableRow>
			)}
		</TableBody>
	);
}

export default Body;
