import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import actionHandler from '../../Handlers/ActionHandler';
import Snackbar from '../Snackbar';

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
 * Celda especial para las acciones con sus respectivas funciones.
 * @param {array} actions Array de acciones.
 * @param {object} actionsSet Objeto que engloba todas las funciones.
 * @param {array} row Array con la fila actual.
 * 
 */
function RowActions(props) {
	const classes = useStyles();
	const [ anchor, setAnchor ] = useState(null);
	const [ openSnack, setOpenSnack ] = useState(false);
	const itemHeight = 48;
	const open = Boolean(anchor);

	function handleClick(event) {
		setAnchor(event.currentTarget);
	}

	function handleClose() {
		setAnchor(null);
	}

	function selectAction(key, rowItems) {
		const formattedRow = [ ...rowItems ];
		props.actionsSet[key] ? props.actionsSet[key](formattedRow) : setOpenSnack(true);
	}

	useEffect(
		() => {
			setOpenSnack(false);
		},
		[ anchor ]
	);

	return (
		<TableCell className={classes.tableCell}>
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
				anchorEl={anchor}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: itemHeight * 4.5,
						width: 200
					}
				}}
			>
				{props.actions.map((action) => (
					<MenuItem
						key={action[0]}
						onClick={() => {
							handleClose();
							selectAction(action[0], props.row);
						}}
					>
						{action[1]}
					</MenuItem>
				))}
			</Menu>
			<Snackbar open={openSnack} type="error" text="Opción no encontrada." />
		</TableCell>
	);
}

RowActions.propTypes = {
	actions: PropTypes.array.isRequired,
	actionsSet: PropTypes.object.isRequired,
	row: PropTypes.array.isRequired
};

export default RowActions;
