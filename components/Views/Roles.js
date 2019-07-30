import React from "react";
import Container from "../Low/Container";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Form from "../High/Form/Form";
import Textbox from "../Low/Textbox";
import StructureForm from "../High/Form/StructureForm";
import rulesTypes from "../High/Form/RulesTypes";
import Button from "../Low/Button";
import Combobox from "../Low/ComboBox";
import Loader from "../Low/Loader";
import useFetch from "../../helpers/useFetch";
import getPermissions from "../../helpers/getPermissions";
import Save from "@material-ui/icons/Save";
import SnackbarComponent from "../Low/Snackbar";
import Modal from "../High/Modal";
import Checkbox from "../Low/Checkbox";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  Box: {
    color: "#e7e7e7 !important",
    marginBottom: "20px"
  },
  CheckBoxMargin: {
    color: "#e7e7e7 !important",
    marginBottom: "1px"
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    marginBottom: "3px"
  },
  smallIcon: {
    fontSize: 20
  }
}));

function Roles(props) {
  const classes = useStyles();
  const ranks = useFetch("/api/users/ranks/", "GET");
  let params = [
    {
      key: "name",
      type: "Textbox",
      rules: rulesTypes.basicString
    },
    {
      key: "hierarchy",
      type: "Combobox",
      rules: null
    }
  ];
  let structure = new StructureForm(params);
  const actionButton = [<Button label="Aceptar" type="default" />];
  const saveRol = data => {
    return null;
    /*return {
          url: `/api/users/roles/${data.name}`,
          method: "PUT",
          body: { rol: data }
      }*/
  };
  const checkBoxUser = data => {
    const checked = { ...data };
    return checked;
  };

  const checkBoxRoles = data => {
    const checked = { ...data };
    return checked;
  };

  const RenderRolesForm = () => {
    return (
      <Container>
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h5.fontSize"
          className={classes.Box}>
          Crear Rol
        </Box>
        {ranks.loading ? (
          <Loader />
        ) : (
          <Form
            structure={structure}
            modalTitle="Crear Rol"
            modalDescription="El Rol se ha creado exitosamente."
            modalTitleError="Crear Rol: error"
            modalDescriptionError="No se ha podido crear el Rol."
            submitLabel={"GUARDAR"}
            submitType={"accented"}
            lg={false}
            submitIcon={
              <Save className={clsx(classes.leftIcon, classes.smallIcon)} />
            }
            modalActions={actionButton}
            getResponse={saveRol}>
            <Textbox label="Nombre" name="name" />
            <Combobox
              options={ranks.response.ranks.map(rank => {
                return { name: rank.rankName, id: rank.rankId };
              })}
              title="Jerarquia"
              name="hierarchy"
            />
          </Form>
        )}

        {/* RRHH */}
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h6.fontSize"
          className={classes.CheckBoxMargin}>
          RRHH
        </Box>
        <Checkbox
          values={["Ver", "Modificar", "Crear", "Eliminar"]}
          checkBoxState={checkBoxUser}
        />
        {/* Roles */}
        <Box
          fontWeight="fontWeightRegular"
          fontSize="h6.fontSize"
          className={classes.CheckBoxMargin}>
          Roles
        </Box>
        <Checkbox
          values={["Ver", "Modificar", "Crear", "Eliminar"]}
          checkBoxState={checkBoxRoles}
        />
      </Container>
    );
  };

  const RenderRolesCheckBoxes = () => {};

  return (
    <div>
      {RenderRolesForm()}
      {RenderRolesCheckBoxes()}
    </div>
  );
}

export default Roles;
