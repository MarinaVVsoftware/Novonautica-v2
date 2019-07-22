import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  size: {
    width: "12rem",
    [theme.breakpoints.up("lg")]: {
      width: "48rem"
    },
    position: "absolute",
    bottom: "0px",
    right: "0px"
  },
  imageSize: {
    width: "100%"
  }
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.size}>
      <img
        className={classes.imageSize}
        src={require("../../static/marinavv-isotipo.svg")}
      />
    </div>
  );
}
