import React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#212121"
  }
}));

function Container(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={4}>
      {props.children}
    </Paper>
  );
}

export default Container;
