// realiza una configuración de los estilos de Material UI
// --- Post bootstrap ---
import React from "react";
import Login from "../components/Views/Login";
import "../src/global.css";
import getSession from "../helpers/getSession";
import Router from "next/router";

function PageLogin(props) {
  return <Login />;
}

PageLogin.getInitialProps = async ({ res, req }) => {
  if (getSession(req) >= 1) {
    if (res) {
      res.writeHead(302, {
        Location: "/"
      });
      res.end();
    } else {
      Router.push({
        pathname: "/"
      });
    }
  }
  return {};
};
export default PageLogin;
