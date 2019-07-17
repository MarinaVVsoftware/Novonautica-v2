import React from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    color: "#2086C7",
    margin: "auto",
    display: "block"
  }
}));
export default function Loader() {
  const classes = useStyles();
  return <CircularProgress className={classes.root} disableShrink />;
}
