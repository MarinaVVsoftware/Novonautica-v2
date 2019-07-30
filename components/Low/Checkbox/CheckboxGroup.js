import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../Low/Loader";
import Checkbox from "../Checkbox/Checkbox";

const useStyles = makeStyles(theme => ({
  root: {}
}));

/** Componente que agrupa y controla varios checkboxs
 *
 * @param {boolean} disabled
 */
function CheckboxGroup(props) {
  const classes = useStyles();
  const data = props.checkboxGroupData ? props.checkboxGroupData : [];

  return (
    <Fragment>
      {data.map(cb => (
        <Checkbox key={cb.name} name={cb.name} label={cb.label} />
      ))}
    </Fragment>
  );
}

export default CheckboxGroup;
