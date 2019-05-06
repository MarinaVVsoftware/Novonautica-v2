import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
	root: {
		color: '#818181'
	},
	color: {
		color: '#E7E7E7 !important'
	}
});

/**
 * 
 * @param {array} values Array de strings, funcionan como valores. 
 */
function RadioButton(props) {
	const classes = useStyles();
	const [ value, setValue ] = useState(props.values[0]);

	function handleChange(event) {
		setValue(event.target.value);
	}

	useEffect(() => {
		console.log(value);
	});

	return (
		<FormControl component="fieldset">
			<RadioGroup aria-label="radioButtons" name="RadioButtons" value={value} onChange={handleChange} row>
				{props.values.map((value, index) => {
					return (
						<FormControlLabel
							key={value}
							value={value}
							control={<Radio color="default" className={classes.root} />}
							label="start"
							labelPlacement="start"
							classes={{ label: classes.color }}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}

export default RadioButton;

RadioButton.propTypes = {
	values: PropTypes.array.isRequired
};
