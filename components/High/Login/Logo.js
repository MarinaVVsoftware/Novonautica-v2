import { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing.unit * 4
  },
  logo: {
    width: "100%",
    height: "auto",
    color: "white"
  }
}));

function Logo(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <img
          className={classes.logo}
          src={require("../../../static/marinavv-imagotipo.svg")}
        />
      </div>
    </Fragment>
  );
}

export default Logo;
