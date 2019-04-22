import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import actionHandler from '../../Handlers/ActionHandler';

const useStyles = makeStyles((theme) => ({
	tableCell: {
		color: '#E7E7E7 !important',
		borderBottom: '1px solid rgba(112, 112, 112, 0.23) !important'
	},
	iconColor: {
		color: '#2086C7 !important'
	}
}));

/**
 * 
 * @param {array} data Array con la información de la fila. 
 */
function Row(props) {
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const ITEM_HEIGHT = 48;
	const open = Boolean(anchorEl);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function selectAction(key, rowItems) {
		const formattedRow = [ ...rowItems ];
		formattedRow.pop();
		actionHandler[key] ? actionHandler[key](formattedRow) : console.log('Acción no encontrada');
	}

	return props.data.map((row, index) => {
		// Si el elemento es un array, se supone que es el array de opciones. Se recorre ese subarray con un dropdown
		if (row instanceof Array) {
			return (
				<TableCell className={classes.tableCell} key={row[0]}>
					<IconButton
						aria-label="More"
						aria-owns={open ? 'long-menu' : undefined}
						aria-haspopup="true"
						onClick={handleClick}
						className={classes.iconColor}
					>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id="long-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							style: {
								maxHeight: ITEM_HEIGHT * 4.5,
								width: 200
							}
						}}
					>
						{row.map((action) => (
							<MenuItem
								key={action[0]}
								onClick={() => {
									handleClose();
									selectAction(action[0], props.data);
								}}
							>
								{action[1]}
							</MenuItem>
						))}
					</Menu>
				</TableCell>
			);
		} else {
			return (
				<TableCell className={classes.tableCell} key={row}>
					{row}
				</TableCell>
			);
		}
	});
}

export default Row;
