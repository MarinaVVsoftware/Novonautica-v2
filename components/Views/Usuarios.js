import React from "react";
import Container from "../Low/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Form from "../High/Form/Form";
import Textbox from "../Low/Textbox";
import StructureForm from "../High/Form/StructureForm";
import rulesTypes from "../High/Form/RulesTypes";
import Button from "../Low/Button";
import Combobox from "../Low/ComboBox";
import DataTable from "../High/DataTable";
import * as tableDummy from "../../dummy/table";
import { rrhh } from "../Handlers/ActionHandler";

const useStyles = makeStyles(theme => ({
  color: {
    color: "#e7e7e7 !important",
    marginBottom: "10px"
  }
}));
function Rrhh() {
  const classes = useStyles();

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
      rules: rulesTypes.basicString
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

  return (
    <div>
      <Container>
        <Typography variant="h6" className={classes.color}>
          Crear Usuario
        </Typography>
        <Form
          structure={structure}
          modalTitle={"Crear Usuario"}
          modalDescription={"El usuario se ha creado exitosamente."}
          submitLabel={"guardar"}
          submitType={"accented"}
          getResponse={getResponse}
          modalActions={actions}
        >
          <Textbox label={"Nombre"} name={"nombre"} />
          <Textbox label={"Usuario"} name={"usuario"} />
          <Textbox label={"Email"} name={"email"} />
          <Textbox label={"Contraseña"} name={"password"} />
          <Combobox
            options={["a", "v", "f"]}
            title={"Status"}
            name={"status"}
          />
          <Combobox options={["a", "v", "f"]} title={"Rol"} name={"rol"} />
        </Form>
      </Container>
      <Container>
        <DataTable
          data={tableDummy.data}
          actions={{ list: tableDummy.actions, set: rrhh }}
          columns={tableDummy.columns}
          title="Lista de Usuarios"
          config={{ rowsPerPageArray: [10, 20], defaultSort: "desc" }}
        />
      </Container>
    </div>
  );
}

export default Rrhh;
