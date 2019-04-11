import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  height: {
    height: "85vh !important"
  }
}));

export default function Home() {
  const classes = useStyles();
  return <div className={classes.height}>Home</div>;
}
