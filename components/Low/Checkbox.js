import { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  color: {
    color: "#E7E7E7 !important"
  },
  checked: {}
}));

function CheckBox(props) {
  const classes = useStyles();
  let checkBoxObject = {};
  props.values.forEach(element => {
    checkBoxObject = props.values
      ? {
          ...checkBoxObject,
          [`check${element}`]: false
        }
      : {};
  });
  /* separación de estados en estados mas simples */
  const [checkAll, setCheckAll] = useState(false);
  const [checkboxs, setCheckboxs] = useState({ ...checkBoxObject });

  const handleChange = name => event => {
    setCheckboxs({ ...checkboxs, [name]: event.target.checked });
  };

  function handleChangeAll() {
    /* crea un arrego vacío */
    var obj = {};
    /* guarda una copia de cada key del checkbox seteado con el valor booleano inverso */
    Object.keys(checkboxs).forEach(checkbox => {
      obj[checkbox] = !checkAll;
    });
    /* setea la nueva lista de checkboxs */
    setCheckboxs({ ...obj });
  }

  const areChecked = state => {
    var allTrue = Object.keys(checkboxs).every(function(k) {
      return checkboxs[k];
    });
    return allTrue;
  };

  /*useEffect(() => {
        const newState = {...state};
        delete newState.checkAll;
        props.checkBoxState(newState);
    }, [state]);*/

  useEffect(() => {
    if (areChecked(checkboxs)) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkboxs]);

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkAll}
            onChange={() => handleChangeAll()}
            value="checkAll"
            color="primary"
            classes={{
              root: classes.root,
              checked: classes.checked
            }}
          />
        }
        label="All"
        classes={{ label: classes.color }}
      />
      {props.values.map((element, index) => (
        <FormControlLabel
          key={element}
          control={
            <Checkbox
              checked={checkboxs[`check${element}`]}
              onChange={handleChange(`check${element}`)}
              value={`check${element}`}
              color="primary"
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          }
          label={element}
          classes={{ label: classes.color }}
        />
      ))}
    </FormGroup>
  );
}

export default CheckBox;
