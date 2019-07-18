import React from "react";
import { makeStyles } from "@material-ui/styles";
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  tablePagination: {
    color: "#E7E7E7 !important"
  }
}));

/**
 * Footer para la tabla, muestra infromación como número de filas y paginación
 * @param {number} dataLength Tamaño de la tabla.
 * @param {number} rowsPerPage Filas por página.
 * @param {Array} rowsPerPageArray Array que determina el numero de filas por página.
 * @param {number} page Número de la página actual.
 * @param {func} handleChangePage Función que cambia de página.
 * @param {func} handleChangeRowsPerPage Función que cambia las filas.
 */
function Pagination(props) {
  const classes = useStyles();
  const {
    dataLength,
    rowsPerPage,
    rowsPerPageArray,
    page,
    handleChangePage,
    handleChangeRowsPerPage
  } = props;
  return (
    <TablePagination
      className={classes.tablePagination}
      classes={{ selectIcon: classes.tablePagination }}
      rowsPerPageOptions={[...rowsPerPageArray]}
      component="div"
      count={dataLength}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        "aria-label": "Previous page"
      }}
      nextIconButtonProps={{
        "aria-label": "Next Page"
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}

Pagination.propTypes = {
  dataLength: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rowsPerPageArray: PropTypes.array,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired
};

export default Pagination;
