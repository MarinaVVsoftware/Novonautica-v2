import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Explore from '@material-ui/icons/Explore';
import iconHandler from '../Handlers/iconHandler';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	color: {
		color: '#e7e7e7 !important'
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	}
}));

/**
 * 
 * @param {object} item Recupera el menu anidado.
 * @param {func} handleClick Función para realizar el click.
 * @param {func} handleDrawerClose Función para cerrar el drawer.
 * @param {func} handleModuleChange Función para cambiar de componente. 
 */
function MenuItemNested(props) {
	const classes = useStyles();
	const menuItem = props.item;
	return (
		<List component="div" disablePadding>
			<ListItem
				button
				className={classes.nested}
				// Se realiza la funcion del handleClick traida desde props
				onClick={() => props.handleClick(props, menuItem.subModuleName)}
			>
				<Tooltip title={menuItem.subModuleName} placement="right-start">
					<ListItemIcon className={classes.color}>
						{iconHandler[menuItem.subModuleName] ? iconHandler[menuItem.subModuleName] : <Explore />}
					</ListItemIcon>
				</Tooltip>
				<ListItemText classes={{ primary: classes.color }} primary={menuItem.subModuleName} />
			</ListItem>
		</List>
	);
}

MenuItemNested.proptype = {
	item: PropTypes.object.isRequired,
	handleClick: PropTypes.func.isRequired,
	handleDrawerClose: PropTypes.func.isRequired,
	handleModuleChange: PropTypes.func.isRequired
};

export default MenuItemNested;
