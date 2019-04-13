import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBarComponent from "../High/dashboard/AppBar";
import DrawerComponent from "../High/dashboard/Drawer";
import { makeStyles } from "@material-ui/styles";
import componentsList from "../Handlers/ModuleHandler";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
}));

/**
 * Función principal que se llama desde Pages.
 * @param {string} name Recupera el nombre para el navbar.
 * @param {object} menu Recupera el objeto del menú.
 */
function DashBoardComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [module, setModule] = React.useState("Home");

  /** Acción que abre el drawer */
  function handleDrawerOpen() {
    setOpen(true);
  }

  /** Acción que cierra el drawer */
  function handleDrawerClose() {
    setOpen(false);
  }

  /** Acción que detecta que modulo cambiar */
  function handleModuleChange(moduleName) {
    moduleName ? setModule(moduleName) : setModule("Home");
  }

  return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBarComponent 
            name={props.name} 
            open={open} 
            handleDrawerOpen={handleDrawerOpen}
        />
        <DrawerComponent
            menu={props.menu}
            open={open} 
            handleDrawerClose={handleDrawerClose} 
            handleModuleChange={handleModuleChange}
        />
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {/* Recupera un componente */}
            {componentsList[module]}
        </main>
    </div>
  );
}

DashBoardComponent.prototypes = {
    name: PropTypes.string,
    menu: PropTypes.object.isRequired
};

export default DashBoardComponent;
