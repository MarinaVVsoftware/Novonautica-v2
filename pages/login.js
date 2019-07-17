// realiza una configuración de los estilos de Material UI
// --- Post bootstrap ---
import React from "react";
import Login from "../components/Views/Login";
import "../src/global.css";
import { getSessionLength } from "../helpers/getSession";
import Router from "next/router";
import jsCookie from "js-cookie";

function PageLogin(props) {
  return <Login />;
}

PageLogin.getInitialProps = async ({ res, req }) => {
  if (res) {
    if (getSessionLength(req) >= 1) {
      res.writeHead(302, {
        Location: "/"
      });
      res.end();
      return {};
    }
    return {};
  } else {
    if (jsCookie.get("token")) {
      Router.push({
        pathname: "/"
      });
      return {};
    }
    return {};
  }
};
export default PageLogin;
