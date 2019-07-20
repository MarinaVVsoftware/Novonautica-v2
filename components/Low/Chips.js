import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import DocIcon from "@material-ui/icons/FileCopy";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

/**
 * @param {array} data Array información, compuesta por un array de objetos. Dentro del objeto pasar la key y su label.
 * @param {func} getChipsState Función que el recupera el state para el padre.
 */
function Chips(props) {
  const classes = useStyles();
  /*const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" }
  ]);*/
  const [chipData, setChipData] = useState(props);

  useEffect(() => {
    props.getChipsState(chipData);
  }, [chipData]);

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    // ------------^ Es el estado previo y con el filter le retorna el nuevo estado y se lo define a la funcion del hook
  };

  return (
    <div className={classes.root}>
      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            icon={<DocIcon />}
            label={data.label}
            // El metodo de handleDelete usa curry, es un metedo para hacer el bind en eventos de click en react
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </div>
  );
}

Chips.propType = {
  data: PropTypes.array.isRequired,
  getChipsState: PropTypes.func.isRequired
};

export default Chips;
