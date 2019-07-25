import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBarComponent from "../High/dashboard/AppBar";
import DrawerComponent from "../High/dashboard/Drawer";
import { makeStyles } from "@material-ui/styles";
import ModuleHandler from "../Handlers/ModuleHandler";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    width: "calc(100% - 70px)"
  }
}));

/**
 * Función principal que se llama desde Pages.
 * @param {string} name Recupera el nombre para el navbar.
 * @param {object} menu Recupera el objeto del menú.
 */
function DashBoardComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState("Home");

  // Acción que abre el drawer
  function handleDrawerOpen() {
    setOpen(true);
  }

  // Acción que cierra el drawer
  function handleDrawerClose() {
    setOpen(false);
  }

  function actualModule() {
    return React.cloneElement(props.children, {
      permissions: props.menu
    });
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
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* Recupera un componente */}
        {actualModule()}
      </main>
    </div>
  );
}

DashBoardComponent.prototypes = {
  name: PropTypes.string,
  menu: PropTypes.object.isRequired
};

export default DashBoardComponent;
