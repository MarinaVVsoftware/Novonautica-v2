import { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  root: {
    color: '#2086C7',
    "&$checked": {
      color: '#2086C7'
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
  const [checkboxes, setCheckboxes] = useState({ ...checkBoxObject });

  const handleChange = name => event => {
    setCheckboxes({ ...checkboxes, [name]: event.target.checked });
  };

  function handleChangeAll() {
    /* crea un arrego vacío */
	var obj = {};
    /* guarda una copia de cada key del checkbox seteado con el valor booleano inverso */
    Object.keys(checkboxes).forEach(checkbox => {
      obj[checkbox] = !checkAll;
	});
	
    /* setea la nueva lista de checkboxess */
    setCheckboxes({ ...obj });
  }

  const areChecked = state => {
    const stateToCheck = {...state};
    var allTrue = Object.keys(stateToCheck).every(function(k) {
      return stateToCheck[k];
    });
    return allTrue;
  };

  	useEffect(() => {
        props.checkBoxState(checkboxes);
	}, [checkboxes]);
	
  useEffect(() => {
    if (areChecked(checkboxes)) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkboxes]);

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
              checked={checkboxes[`check${element}`]}
              onChange={handleChange(`check${element}`)}
              value={`check${element}`}
              color="primary"
              classes={{
                root: classes.color,
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
