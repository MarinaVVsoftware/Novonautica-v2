// realiza una configuración de los estilos de Material UI
// --- Post bootstrap ---
import React from "react";
import Login from "../components/Views/Login";
import "../src/global.css";
import { getSessionLength } from "../helpers/getSession";
import Router from "next/router";
import jsCookie from "js-cookie";

function PageLogin(props) {
  console.log(props);
  return <Login />;
}

PageLogin.getInitialProps = async ({ res, req }) => {};

export default PageLogin;
