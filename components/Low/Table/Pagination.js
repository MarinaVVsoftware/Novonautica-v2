import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	tablePagination: {
		color: '#E7E7E7 !important'
	}
}));

/**
 * 
 * @param {number} dataLength Tamaño de la tabla.
 * @param {number} rowsPerPage Filas por página.
 * @param {number} page Número de la página actual.
 * @param {func} handleChangePage Función que cambia de página.
 * @param {func} handleChnageRowsPerPage Función que cambia las filas.
 */
function Pagination(props) {
	const classes = useStyles();
	const { dataLength, rowsPerPage, page, handleChangePage, handleChnageRowsPerPage } = props;
	return (
		<TablePagination
			className={classes.tablePagination}
			classes={{ selectIcon: classes.tablePagination }}
			rowsPerPageOptions={[ 5, 10, 25 ]}
			component="div"
			count={dataLength}
			rowsPerPage={rowsPerPage}
			page={page}
			backIconButtonProps={{
				'aria-label': 'Previous page'
			}}
			nextIconButtonProps={{
				'aria-label': 'Next Page'
			}}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChnageRowsPerPage}
		/>
	);
}

Pagination.propTypes = {
	dataLength: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	handleChangePage: PropTypes.func.isRequired,
	handleChnageRowsPerPage: PropTypes.func.isRequired
};

export default Pagination;
