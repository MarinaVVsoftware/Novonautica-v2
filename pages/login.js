// realiza una configuración de los estilos de Material UI
import "../src/bootstrap";
// --- Post bootstrap ---
import React, { Fragment } from "react";
import Login from "../components/Views/Login";
import "../src/global.css";

function PageLogin() {
  return <Login />;
}

export default PageLogin;
