import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Collapse from '@material-ui/core/Collapse';
import Explore from '@material-ui/icons/Explore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import iconHandler from '../Handlers/iconHandler';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItemNested from './MenuItemNested';
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
 * @param {object} menuItem Recupera el menu.
 * @param {func} handleDrawerClose Función para cerrar el drawer.
 * @param {func} handleModuleChange Función para cambiar el componente.
 */
function MenuItem(props) {
	const classes = useStyles();
	const [ open, setOpen ] = useState(false);
	const menuItem = props.menuItem;

	// Función que se comparte con otros componentes para realizar la acción del click
	const handleClick = ({ handleDrawerClose, handleModuleChange }, moduleName) => {
		handleDrawerClose();
		handleModuleChange(moduleName);
	};

	// Función para asignar el bool para el menú anidado
	const handleClickNested = () => {
		setOpen(!open);
	};

	return (
		<div>
			<ListItem
				button
				// Si menuItem.subModules está declarado, se ejecuta el handleClickNested, sino handleClick
				onClick={() => (menuItem.subModules ? handleClickNested() : handleClick(props, menuItem.moduleName))}
			>
				<Tooltip title={menuItem.moduleName} placement="right-start">
					<ListItemIcon className={classes.color}>
						{/* Si iconHandler[menuItem.moduleName] 
                        esta declarado le asigna el icono, 
                        sino realiza un fallback con el icono explore */}
						{iconHandler[menuItem.moduleName] ? iconHandler[menuItem.moduleName] : <Explore />}
					</ListItemIcon>
				</Tooltip>
				<ListItemText classes={{ primary: classes.color }} primary={menuItem.moduleName} />
				{/* Si menu.subModules esta declarado, realiza otra condición para operar el icono del dropdown */}
				{menuItem.subModules ? open ? <ExpandLess /> : <ExpandMore /> : ''}
			</ListItem>

			{/* Si menuItem.subModules esta declarado, llama al componente del dropdown */}
			{menuItem.subModules ? (
				<Collapse in={open} timeout="auto" unmountOnExit>
					{menuItem.subModules.map((item, index) => (
						<MenuItemNested
							item={item}
							key={index}
							handleClick={handleClick}
							handleDrawerClose={props.handleDrawerClose}
							handleModuleChange={props.handleModuleChange}
						/>
					))}
				</Collapse>
			) : (
				''
			)}
		</div>
	);
}

MenuItem.proptype = {
	menuItem: PropTypes.object.isRequired,
	handleDrawerClose: PropTypes.func.isRequired,
	handleModuleChange: PropTypes.func.isRequired
};

export default MenuItem;
