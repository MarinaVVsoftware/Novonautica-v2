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
import { users } from "../Handlers/ActionHandler";
import Router from "next/router";
import useFetch from "../../helpers/useFetch";
import getPermissions from "../../helpers/getPermissions";

const useStyles = makeStyles(theme => ({
  Box: {
    color: "#e7e7e7 !important",
    marginBottom: "20px"
  }
}));

function Users(props) {
  const classes = useStyles();
  const permissions = getPermissions("RRHH", "Usuarios", props.permissions);
  const [statusData, statusLoading] = useFetch("/api/users/status/", "GET");
  const [rolData, rolLoading] = useFetch("/api/users/roles/", "GET");
  const [usersData, usersLoading] = useFetch("/api/users/", "GET");
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

  const RenderUsersForm = () => {
    return permissions.includes("CrearUsuario") ? (
      <Container>
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h5.fontSize"
          className={classes.Box}>
          Crear Usuario
        </Box>
        {statusLoading || rolLoading ? (
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
              options={statusData.status.map(status => status.statusName)}
              title={"Status"}
              name={"status"}
            />
            <Combobox
              options={rolData.roles.map(rol => rol.rolName)}
              title={"Rol"}
              name={"rol"}
            />
          </Form>
        )}
      </Container>
    ) : (
      ""
    );
  };

  const usersActionTable = () => {
    const actions = [];
    if (permissions.includes("ModificarUsuario")) {
      actions.push(["modifyUser", "Modificar Usuario"]);
    }
    if (permissions.includes("EliminarUsuario")) {
      actions.push(["deleteUser", "Eliminar Usuario"]);
    }
    return actions;
  };

  const RenderUsersTable = () => {
    return permissions.includes("VerUsuarios") ? (
      <Container>
        {usersLoading ? (
          <Loader />
        ) : (
          <DataTable
            data={usersData.users}
            title="Lista de Usuarios"
            actions={
              usersActionTable().length > 0
                ? { list: usersActionTable(), set: users }
                : null
            }
            config={{
              rowsPerPage: usersData.users.length,
              defaultSort: "desc"
            }}
          />
        )}
      </Container>
    ) : (
      ""
    );
  };

  return (
    <div>
      {RenderUsersForm()}
      {RenderUsersTable()}
    </div>
  );
}

export default Users;
