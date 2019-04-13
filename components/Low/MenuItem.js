import React, { useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import Collapse from "@material-ui/core/Collapse";
import Explore from "@material-ui/icons/Explore";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconHandler from "../Handlers/IconHandler";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NestedItem from "./MenuItemNested";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    color: {
      color: "#e7e7e7 !important"
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
}));

/**
 * 
 * @param {object} menuItem Recupera el menu.
 * @param {func} handleDrawerClose Función para cerrar el drawer.
 * @param {func} handleModuleChange Función para cambiar el componente.
 */
function MenuItem(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const menuItem = props.menuItem;
    const handleClick = ({handleDrawerClose, handleModuleChange}, moduleName) => {
        handleDrawerClose();
        handleModuleChange(moduleName);
    };
    const handleClickNested = () => {
        setOpen(!open);
    }
    
    return (
        <div>
            <ListItem
                button
                onClick={ () => 
                    menuItem.subModules 
                    ? handleClickNested()
                    : handleClick(props, menuItem.moduleName)
                }
            >
                <ListItemIcon className={classes.color}>
                    {IconHandler[menuItem.moduleName] ? IconHandler[menuItem.moduleName] : <Explore /> }
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.color }} primary={menuItem.moduleName} />
                { menuItem.subModules ? open ? <ExpandLess /> : <ExpandMore /> : "" }
            </ListItem>
            { menuItem.subModules 
                ? <Collapse in={open} timeout="auto" unmountOnExit>
                        {menuItem.subModules.map((item,index) => (
                            <NestedItem 
                                item={item} 
                                key={item} 
                                handleClick={handleClick} 
                                handleDrawerClose={props.handleDrawerClose}
                                handleModuleChange={props.handleModuleChange} 
                            />
                        ))}
                    </Collapse>
                : ""
            }
        </div>
    )
}

MenuItem.propstype = {
    menuItem: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    handleModuleChange: PropTypes.func.isRequired
}

export default MenuItem;