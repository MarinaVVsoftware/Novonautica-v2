import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Head from "./../Low/Table/Head";
import Body from "./../Low/Table/Body";
import Pagination from "./../Low/Table/Pagination";
import prettifyCamelCase from "../../helpers/prettifyCamelCase";

// Recupera los elementos del array y el nombre a ordenar.
function desc(a, b, orderBy) {
  return b[orderBy] === a[orderBy] ? 0 : b[orderBy] > a[orderBy] ? 1 : -1;
}

// Ordena el array.
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

// Decide que key se usa para el ordenamiento
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "#424242"
  },
  table: {
    minWidth: 1020,
    color: "#E7E7E7 !important"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  title: {
    padding: "15px",
    color: "#E7E7E7 !important"
  }
}));

/**
 * Componente Tabla para datos dinámicos.
 * @param {array} data Objeto para la tabla.
 * @param {array} actions Conjunto de acciones.
 * @param {string} title Titulo para la tabla.
 * @param {object} config Configuraciones para la tabla
 */
function DataTable(props) {
  const classes = useStyles();
  const body = convertToBody(props.data);
  const columns = convertToColumns(props.data);
  const actualRows = props.config.rowsPerPage;
  const [order, setOrder] = useState(props.config.defaultSort);
  const [orderBy, setOrderBy] = useState(0);
  const [data] = useState(body);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(actualRows);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  function convertToColumns(data) {
    const objectFormat = data[0];
    const columns = Object.keys(objectFormat);
    const formattedColumns = [];
    columns.forEach(element => {
      formattedColumns.push([element, prettifyCamelCase(element)]);
    });
    if (props.actions) {
      formattedColumns.push(["options", "Opciones"]);
    }

    return formattedColumns;
  }

  function convertToBody(data) {
    const body = [];
    data.forEach(element => {
      body.push(Object.values(element));
    });

    return body;
  }

  function getRowsView(rowsPerPage) {
    const rows = [];
    if (rowsPerPage < 10) {
      rows.push(rowsPerPage);
      return rows;
    } else if (rowsPerPage > 30) {
      const defaultRows = [10, 20, 30];
      rows.push(rowsPerPage);
      return defaultRows.concat(rows);
    } else {
      return rows;
    }
  }

  // Asigna el nombre para el ordenamiento.
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
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
          <Head
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            columns={columns}
          />
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
        rowsPerPageArray={getRowsView(actualRows)}
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
  title: PropTypes.string,
  config: PropTypes.shape({
    rowsPerPageArray: PropTypes.number,
    defaultSort: PropTypes.string
  })
};

DataTable.defaultProps = {
  data: {},
  title: "Table Actions",
  actions: {
    list: null,
    set: null
  },
  config: {
    rowsPerPageArray: 10,
    defaultSort: "asc"
  }
};

export default DataTable;
