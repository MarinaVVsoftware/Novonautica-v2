import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListComponent from './List';

const drawerWidth = 240;

const useStyles = makeStyles(theme =>({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerBackgroundColor: {
    backgroundColor: '#424242 !important'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 8 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  color: {
    color: '#E7E7E7 !important'
  }
}));

function DrawerComponent(props) {
    const classes = useStyles();
    return (
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer,{
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          })}
          classes={{
            paper: classNames(
              classes.drawerBackgroundColor, {
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open,
            }),
          }}
          open={props.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={props.handleDrawerClose}>
               <ChevronLeftIcon className={classes.color} />
            </IconButton>
          </div>
            <ListComponent handleDrawerClose={props.handleDrawerClose} />
        </Drawer>
    );
}

export default DrawerComponent;