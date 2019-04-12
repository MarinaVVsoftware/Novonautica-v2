import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBarComponent from "../High/dashboard/AppBar";
import DrawerComponent from "../High/dashboard/Drawer";
import { makeStyles } from "@material-ui/styles";
import ModuleHandler from "../High/dashboard/ModuleHandler";
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
 * @param {Object} props 
 */
function DashBoardComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [module, setModule] = React.useState("dashboard");

  /** Acción que abre el drawer */
  function handleDrawerOpen() {
    setOpen(true);
  }

  /** Acción que cierra el drawer */
  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
        <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {/**
            * Retorna un componente
            * @param {string} componentKey
            */}
            {ModuleHandler("home")}
        </main>
    </div>
  );
}

DashBoardComponent.prototypes = {
    name: PropTypes.string,
    menu: PropTypes.object.isRequired
};

export default DashBoardComponent;
