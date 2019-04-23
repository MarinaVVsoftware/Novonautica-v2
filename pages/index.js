// realiza una configuración de los estilos de Material UI
import "../src/bootstrap";
// --- Post bootstrap ---
import React, { Fragment, useEffect } from "react";
import "../src/global.css";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormComponent from "../components/High/Form/Form";
import Textbox from "../components/Low/Textbox";
import StructureForm from "../components/High/Form/StructureForm";
import rulesTypes from "../components/High/Form/RulesTypes";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "500px"
  }
}));

function Index(props) {
  const classes = useStyles();

  let params = [
    {
      key: "user",
      rules: rulesTypes.basicString
    },
    {
      key: "password",
      rules: rulesTypes.password
    },
    {
      key: "user1",
      rules: rulesTypes.basicString
    },
    {
      key: "password1",
      rules: rulesTypes.password
    },
    {
      key: "user2",
      rules: rulesTypes.basicString
    },
    {
      key: "password2",
      rules: rulesTypes.password
    },
    {
      key: "user3",
      rules: rulesTypes.basicString
    },
    {
      key: "password3",
      rules: rulesTypes.password
    }
  ];
  let structure = new StructureForm(params);

  // useEffect(() => {
  //   console.log(structure);
  //   console.log(JSON.stringify(structure));
  // }, []);

  return (
    <Fragment>
      <Paper className={classes.root}>
        <FormComponent structure={structure}>
          <Textbox label={"user"} name={"user"} />
          <Textbox label={"password"} name={"password"} />
          <Textbox label={"user1"} name={"user1"} />
          <Textbox label={"password1"} name={"password1"} />
          <Textbox label={"user2"} name={"user2"} />
          <Textbox label={"password2"} name={"password2"} />
          <Textbox label={"user3"} name={"user3"} />
          <Textbox label={"password3"} name={"password3"} />
        </FormComponent>
      </Paper>
    </Fragment>
  );
}

export default Index;
