import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
	tablePagination: {
		color: '#E7E7E7 !important'
	}
}));

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

export default Pagination;
