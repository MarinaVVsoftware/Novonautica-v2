// realiza una configuración de los estilos de Material UI
// --- Post bootstrap ---
import React from "react";
import "../src/global.css";
import DashBoard from "../components/Views/DashBoard";
import Home from "../components/Views/Home";

function Index(props) {
  if (!props) return null;
  return (
    <DashBoard
      name={props.data.user.username}
      menu={JSON.parse(props.data.user.rol.permissions)}>
      <Home />
    </DashBoard>
  );
}

Index.getInitialProps = async ({ res, req }) => {};

export default Index;
