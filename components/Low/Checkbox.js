import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
	root: {
		color: green[600],
		'&$checked': {
			color: green[500]
		}
	},
	color: {
		color: '#E7E7E7 !important'
	},
	checked: {}
}));

function CheckBox(props) {
	const classes = useStyles();
	let checkBoxObject = {};
	props.values.forEach((element) => {
		checkBoxObject = props.values
			? {
					...checkBoxObject,
					[`check${element}`]: false
				}
			: {};
	});
	const [ state, setState ] = React.useState({ checkAll: false, ...checkBoxObject });

	const handleChange = (name) => (event) => {
		setState({ ...state, [name]: event.target.checked });
	};

	const handleChangeAll = (name) => (event) => {
		const checkBoxesTrue = Object.keys(state).forEach((element) => (state[element] = event.target.checked));
		setState({ ...state, ...checkBoxesTrue });
    };
    
    const areChecked = (state) => {
        const newState = {...state};
        delete newState.checkAll;
        var allTrue = Object.keys(newState).every(function(k){ return newState[k] });
        return allTrue;
    };

    // const checkBoxState = (state) => {
    //     const newState = {...state};
    //     delete newState.checkAll;
    //     props.checkBoxState(newState);
    // }

    /*useEffect(() => {
        const newState = {...state};
        delete newState.checkAll;
        props.checkBoxState(newState);
    }, [state]);*/

    useEffect(() => {
        if(areChecked(state)) {
            setState({
                ...state,
                checkAll: true
            });
        } else {
            setState({
                ...state,
                checkAll: false
            });
        }
    }, [Object.values(state)]);


	return (
		<FormGroup row>
			<FormControlLabel
				control={
					<Checkbox
						checked={state.checkAll}
						onChange={handleChangeAll('checkAll')}
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
							checked={state[`check${element}`]}
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
