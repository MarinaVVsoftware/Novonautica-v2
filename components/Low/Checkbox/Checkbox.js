import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  checkbox: {
    color: "#E7E7E7 !important",
    "&$checked": {
      color: "#E7E7E7 !important"
    }
  },
  disabled: { color: "#686868 !important" },
  formControlLabel: {
    color: "#E7E7E7 !important"
  }
}));

/** Componente Checkbox base
 *
 * @param {string} name
 * @param {string} label
 * @param {boolean} disabled
 */
function CheckboxComponent(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [disabled] = useState(props.disabled);

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  const handleChange = e => setChecked(e.target.checked);

  return (
    <FormControlLabel
      classes={{
        label: !disabled ? classes.formControlLabel : classes.disabled
      }}
      disabled={disabled}
      control={
        <Checkbox
          classes={{
            root: classes.checkbox,
            disabled: classes.disabled
          }}
          disabled={disabled}
          color={"default"}
          checked={checked}
          onChange={handleChange}
          value={props.name}
          inputProps={{
            "aria-label": props.label
          }}
        />
      }
      label={props.label}
    />
  );
}

export default CheckboxComponent;
