import React from "react";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Row from "./Row";
import RowActions from "./RowActions";

/**
 * Cuerpo de la tabla.
 * @param {func} getSorting Nombre para ordenar 'asc' o 'desc'.
 * @param {func} stableSort Método que retorna un array ordenado.
 * @param {string} order Nombre para ordenar.
 * @param {number} orderBy Nombre para ordenar.
 * @param {number} page Número de página.
 * @param {number} rowsPerPage Número de filas.
 * @param {number} emptyRows
 * @param {array} data Array de información.
 * @param {array} actions Array de opciones.
 * @param {array} actionsSet Array de opciones.
 */
function Body(props) {
  const {
    stableSort,
    getSorting,
    order,
    orderBy,
    page,
    rowsPerPage,
    emptyRows,
    data,
    actions,
    actionsSet
  } = props;
  actions ? actions : null;
  actionsSet ? actionsSet : null;

  function rowActions(actions, actionsSet, row) {
    if (actions && actionsSet) {
      return <RowActions actions={actions} actionsSet={actionsSet} row={row} />;
    }
    return null;
  }

  return (
    <TableBody>
      {stableSort(data, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((n, i) => {
          return (
            <TableRow key={i}>
              <Row data={n} />
              {rowActions(actions, actionsSet, n)}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

Body.propTypes = {
  getSorting: PropTypes.func.isRequired,
  stableSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  emptyRows: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.array
};

export default Body;
