import React, { useEffect, useState, Fragment } from "react";
import Container from "../Low/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import Form from "../High/Form/Form";
import Textbox from "../Low/Textbox";
import StructureForm from "../High/Form/StructureForm";
import rulesTypes from "../High/Form/RulesTypes";
import Button from "../Low/Button";
import Combobox from "../Low/ComboBox";
import Loader from "../Low/Loader";
import DataTable from "../High/DataTable";
import * as tableDummy from "../../dummy/table";
import { users } from "../Handlers/ActionHandler";
import Router from "next/router";
import useFetch from "../../helpers/useFetch";

const useStyles = makeStyles(theme => ({
  Box: {
    color: "#e7e7e7 !important",
    marginBottom: "20px"
  }
}));
function Users() {
  const classes = useStyles();
  const status = useFetch(
    "https://novocore-dev.novonautica.com/api/users/status/",
    "GET"
  );
  const rol = useFetch(
    "https://novocore-dev.novonautica.com/api/users/roles/",
    "GET"
  );
  let params = [
    {
      key: "nombre",
      rules: rulesTypes.basicString
    },
    {
      key: "usuario",
      rules: rulesTypes.basicString
    },
    {
      key: "email",
      rules: rulesTypes.email
    },
    {
      key: "password",
      rules: rulesTypes.password
    },
    {
      key: "status",
      rules: null
    },
    {
      key: "rol",
      rules: null
    }
  ];
  let structure = new StructureForm(params);

  const getResponse = data => {
    console.log(data);
  };

  const actions = [<Button label={"Aceptar"} type={"default"} />];

  const forms = (
    <Fragment>
      {status.loading && rol.loading ? (
        <Loader />
      ) : (
        <Form
          structure={structure}
          modalTitle={"Crear Usuario"}
          modalDescription={"El usuario se ha creado exitosamente."}
          submitLabel={"guardar"}
          submitType={"accented"}
          getResponse={getResponse}
          modalActions={actions}>
          <Textbox label={"Nombre"} name={"nombre"} />
          <Textbox label={"Usuario"} name={"usuario"} />
          <Textbox label={"Email"} name={"email"} />
          <Textbox label={"Contraseña"} name={"password"} type="password" />
          <Combobox
            options={status.data.status.map(status => status.statusName)}
            title={"Status"}
            name={"status"}
          />
          {/* <Combobox
            options={rol.roles.map(rol => rol.rolName)}
            title={"Rol"}
            name={"rol"}
          /> */}
        </Form>
      )}
    </Fragment>
  );

  return (
    <div>
      <Container>
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h5.fontSize"
          className={classes.Box}>
          {"value: " + status.loading + " | another value: " + rol.loading}
        </Box>
        {forms}
      </Container>
      {/*<Container>
        <DataTable
          data={tableDummy.data}
          actions={{ list: tableDummy.actions, set: users }}
          columns={tableDummy.columns}
          title="Lista de Usuarios"
          config={{ rowsPerPageArray: [10, 20], defaultSort: "desc" }}
        />
      </Container>*/}
    </div>
  );
}

export default Users;
