import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  size: {
    height: '80vh',
    position: 'relative',
    overflow: 'hidden'
  },
  imageSize: {
    maxWidth: '100%',
    width: '100vh',
    position: 'absolute',
    bottom: '-10px',
    right: '-40px',
    [theme.breakpoints.up('sm')]: {
      bottom: '-75px',
      right: '-100px',
    },
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.size}>
        <img className={classes.imageSize} src={require('../../static/marinavv-isotipo.svg')} />
    </div>
  );
}
