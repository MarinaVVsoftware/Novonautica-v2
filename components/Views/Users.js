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
  const [loading, setLoading] = useState(false);

  const [statusData, statusLoading] = useFetch("/api/users/status/", "GET");
  const [rolData, rolLoading] = useFetch("/api/users/roles/", "GET");

  const getResponse = data => {
    console.log(data);
  };

  const handleSave = data => {
    const [userData, userLoading] = useFetch(`/api/users/${user}`, "PUT", {
      user: {
        rolId: 6,
        statusId: 1,
        email: "insert@mail.com",
        userName: "insert",
        password: "123456",
        recruitmentDate: "2019-01-01"
      }
    });

    return {
      userData,
      userLoading
    };
  };

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

  const actions = [<Button label={"Aceptar"} type={"default"} />];

  return (
    <div>
      <Container>
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h5.fontSize"
          className={classes.Box}
        >
          Crear Usuario
        </Box>
        {statusLoading || rolLoading ? (
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
            getResponse={getResponse}
            // setLoading={loading}
            // setResponse={setResponse}
            modalActions={actions}
          >
            <Textbox label={"Nombre"} name={"name"} />
            <Textbox label={"Usuario"} name={"username"} />
            <Textbox label={"Email"} name={"email"} />
            <Textbox label={"Contraseña"} name={"password"} type="password" />
            <Combobox
              options={statusData.status.map(status => {
                return { name: status.statusName, id: status.statusId };
              })}
              title={"Status"}
              name={"statusId"}
            />
            <Combobox
              data={rolData.roles}
              options={rolData.roles.map(rol => {
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
    </div>
  );
}

export default Users;
