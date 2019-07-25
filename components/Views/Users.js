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
import { userActions } from "../Handlers/ActionHandler";
import Router from "next/router";
import useFetch from "../../helpers/useFetch";
import getPermissions from "../../helpers/getPermissions";
import clsx from "clsx";
import Save from "@material-ui/icons/Save";
import SnackbarComponent from "../Low/Snackbar";
import DatePicker from "../Low/DatePicker";

const useStyles = makeStyles(theme => ({
  Box: {
    color: "#e7e7e7 !important",
    marginBottom: "20px"
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    marginBottom: "3px"
  },
  smallIcon: {
    fontSize: 20
  }
}));

function Users(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const permissions = getPermissions("RRHH", "Usuarios", props.permissions);
  const status = useFetch("/api/users/status/", "GET");
  const roles = useFetch("/api/users/roles/", "GET");
  const users = useFetch("/api/users/", "GET");

  let params = [
    {
      key: "name",
      type: "Textbox",
      rules: rulesTypes.basicString
    },
    {
      key: "username",
      type: "Textbox",
      rules: rulesTypes.basicString
    },
    {
      key: "email",
      type: "Textbox",
      rules: rulesTypes.email
    },
    {
      key: "password",
      type: "Textbox",
      rules: rulesTypes.password
    },
    {
      key: "recruitDate",
      type: "DatePicker",
      rules: null
    },
    {
      key: "statusId",
      type: "Combobox",
      rules: null
    },
    {
      key: "rolId",
      type: "Combobox",
      rules: null
    }
  ];
  let structure = new StructureForm(params);

  /* Conjunto de acciones para los rows del datatable */
  const actions = [<Button label={"Aceptar"} type={"default"} />];

  /* Revisan los errores de los fetch GET */
  useEffect(() => {
    setError(status.error);
    setErrorMessage(status.response);
  }, [status.error]);

  useEffect(() => {
    setError(roles.error);
    setErrorMessage(roles.response);
  }, [roles.error]);

  useEffect(() => {
    setError(users.error);
    setErrorMessage(users.response);
  }, [users.error]);

  /* Obtiene los datos, los manipula, y se los devuelve al form como los params
  para hacer el fetch */
  const getResponse = data => {
    data.recruitmentDate = "2019-01-01";

    return {
      url: "/api/users/" + data.username,
      method: "PUT",
      body: { user: data }
    };
  };

  const RenderUsersForm = () => {
    return permissions.includes("CrearUsuario") ? (
      <Container>
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h5.fontSize"
          className={classes.Box}>
          Crear Usuario:
        </Box>

        {status.loading || roles.loading || error ? (
          <Loader />
        ) : (
          <Form
            structure={structure}
            modalTitle={"Crear Usuario"}
            modalDescription={"El usuario se ha creado exitosamente."}
            modalTitleError={"Crear Usuario: error"}
            modalDescriptionError={
              "La creación del usuario ha fallado. Contacte con soporte."
            }
            submitLabel={"continuar"}
            submitType={"accented"}
            submitIcon={
              <Save className={clsx(classes.leftIcon, classes.smallIcon)} />
            }
            modalActions={actions}
            getResponse={getResponse}>
            <Textbox label={"Nombre"} name={"name"} />
            <Textbox label={"Usuario"} name={"username"} />
            <Textbox label={"Email"} name={"email"} />
            <DatePicker label="date" name="date" />
            <Textbox label={"Contraseña"} name={"password"} type="password" />
            <Combobox
              options={status.response.status.map(status => {
                return { name: status.statusName, id: status.statusId };
              })}
              title={"Status"}
              name={"statusId"}
            />
            <Combobox
              options={roles.response.roles.map(rol => {
                return { name: rol.rolName, id: rol.rolId };
              })}
              title={"Rol"}
              name={"rolId"}
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
        {users.loading || error ? (
          <Loader />
        ) : (
          <DataTable
            data={users.response.users}
            title="Lista de Usuarios"
            actions={
              usersActionTable().length > 0
                ? { list: usersActionTable(), set: userActions }
                : null
            }
            config={{
              rowsPerPage: users.response.users.length,
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
      <SnackbarComponent
        type={"error"}
        text={errorMessage}
        open={error}
        vertical={"bottom"}
        horizontal={"left"}
      />
    </div>
  );
}

export default Users;
