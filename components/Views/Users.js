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
import clsx from "clsx";
import Save from "@material-ui/icons/Save";
import SnackbarComponent from "../Low/Snackbar";

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

function Users() {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const status = useFetch("/api/users/status/", "GET");
  const roles = useFetch("/api/users/roles/", "GET");

  /* Parámetros para el componente Form */
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

  /* Obtiene los datos, los manipula, y se los devuelve al form como los params
  para hacer el fetch */
  const getResponse = data => {
    // data.recruitmentDate = "2019-01-01";

    return {
      url: "/api/users/" + data.username,
      method: "PUT",
      body: { user: data }
    };
  };

  return (
    <div>
      <Container>
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h5.fontSize"
          className={classes.Box}
        >
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
            getResponse={getResponse}
          >
            <Textbox label={"Nombre"} name={"name"} />
            <Textbox label={"Usuario"} name={"username"} />
            <Textbox label={"Email"} name={"email"} />
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
      <Container>
        <DataTable
          data={tableDummy.data}
          actions={{ list: tableDummy.actions, set: users }}
          columns={tableDummy.columns}
          title="Lista de Usuarios"
          config={{ rowsPerPageArray: [10, 20], defaultSort: "desc" }}
        />
      </Container>
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
