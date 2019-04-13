import React from "react";
import { makeStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import ExitApp from "@material-ui/icons/ExitToApp";
import MenuItem from "./../../Low/MenuItem";

const useStyles = makeStyles(theme => ({
  color: {
    color: "#e7e7e7 !important"
  },
  colorRed: {
    color: "#E53935 !important"
  }
}));

/**
 * 
 * @param {object} menu Recupera el menú a tráves de un objeto.
 * @param {func} handleDrawerClose Función que cierra el drawer.
 * @param {func} handleModuleChange Función para cambiar componente.
 */
function MenuComponent(props) {
  const classes = useStyles();
  return (
    <div>
        <Divider />
            <List>
                {props.menu.modules.map((item, index) => (
                    <MenuItem 
                        menuItem={item} 
                        key={item} 
                        handleDrawerClose={props.handleDrawerClose} 
                        handleModuleChange={props.handleModuleChange} 
                    />
                ))}
            </List>
        <div>
            <Divider />
            <ListItem 
                button 
                key={'exit'} 
                onClick={() => handleClick(props.handleDrawerClose)}
            >
                <ListItemIcon className={classes.colorRed}>
                    <ExitApp />
                </ListItemIcon>
                <ListItemText classes = {{ primary: classes.color }} primary={"Salir"} />  
            </ListItem>
        </div>
    </div>
  );
}

MenuComponent.proptype = {
    menu: PropTypes.object,
    handleDrawerClose: PropTypes.func.isRequired,
    handleModuleChange: PropTypes.func.isRequired,
};

export default MenuComponent;