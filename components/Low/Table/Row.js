import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles(theme => ({
  tableCell: {
    color: "#E7E7E7 !important",
    borderBottom: "1px solid rgba(112, 112, 112, 0.23) !important"
  },
  iconColor: {
    color: "#2086C7 !important"
  }
}));

/**
 * Celda para la tabla.
 * @param {array} data Array con la información de la fila.
 */
function Row(props) {
  const classes = useStyles();

  return props.data.map((row, index) => (
    <TableCell className={classes.tableCell} key={index}>
      {row}
    </TableCell>
  ));
}

Row.propTypes = {
  data: PropTypes.array.isRequired
};

export default Row;
