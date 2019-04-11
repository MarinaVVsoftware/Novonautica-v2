import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBarBackground: {
    backgroundColor: "#212121"
  },
  grow: {
    flexGrow: 1,
    color: "#E7E7E7",
    paddingRight: "12px"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    color: "#E7E7E7"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  }
}));

function AppBarComponent(props) {
  const classes = useStyles();
  return (
    <AppBar
      className={classNames(classes.appBar, classes.appBarBackground, {
        [classes.appBarShift]: props.open
      })}
      position="fixed"
    >
      <ToolBar disableGutters={!props.open}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={props.handleDrawerOpen}
          className={classNames(classes.menuButton, {
            [classes.hide]: props.open
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className={classes.grow}
          color="inherit"
          noWrap
        >
          News
        </Typography>
      </ToolBar>
    </AppBar>
  );
}

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default AppBarComponent;
