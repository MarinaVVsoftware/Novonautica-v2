// realiza una configuración de los estilos de Material UI
import "../src/bootstrap";
// --- Post bootstrap ---
import React, { Fragment } from "react";
import ButtonComponent from "../components/Low/Button";

function Index() {
  return (
    <Fragment>
      <div>Base project</div>
      <ButtonComponent type={"text"} label={"transparent"} />
      <ButtonComponent type={"textAccented"} label={"transparent"} />
    </Fragment>
  );
}

export default Index;
