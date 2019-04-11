import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBarComponent from "../High/dashboard/AppBar";
import DrawerComponent from "../High/dashboard/Drawer";
import { makeStyles } from "@material-ui/styles";
import ModuleHandler from "../High/dashboard/ModuleHandler";

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

function DashBoardComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [module, setModule] = React.useState("dashboard");

  function handleDrawerOpen() {
    setOpen(true);
  }

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
        {ModuleHandler("home")}
      </main>
    </div>
  );
}

export default DashBoardComponent;
