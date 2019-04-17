import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
})) 

function Container(props) {
    const classes = useStyles();

    <Paper className={classes.root} elevation={1}>
        {props.children}
    </Paper>
}

export default Container;