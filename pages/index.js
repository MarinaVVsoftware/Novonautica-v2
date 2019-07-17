// realiza una configuración de los estilos de Material UI
// --- Post bootstrap ---
import React from "react";
import "../src/global.css";
import DashBoardComponent from "../components/Views/DashBoard";
import getSession, { getSessionLength } from "../helpers/getSession";
import jsCookie from "js-cookie";
import Router from "next/router";
import fetch from "isomorphic-fetch";

function Index(props) {
  return (
    <DashBoardComponent
      name={props.data.user.username}
      menu={JSON.parse(props.data.user.rol.permissions)}
    />
  );
}

Index.getInitialProps = async ({ res, req }) => {
  if (res) {
    if (getSessionLength(req) === 0) {
      res.writeHead(302, {
        Location: "/login"
      });
      res.end();
      return {};
    }
  } else {
    if (!jsCookie.get("token")) {
      Router.push({
        pathname: "/login"
      });
      return {};
    }
  }

  const cookies = {};
  if (req) {
    cookies.token = getSession(req).token;
    cookies.user = getSession(req).user;
  } else {
    cookies.token = jsCookie.get("token");
    cookies.user = jsCookie.get("user");
  }

  const params = {
    mode: "cors",
    method: "GET",
    headers: {
      Authorization: cookies.token
    }
  };

  process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  const initialReq = await fetch(
    `https://novocore-dev.novonautica.com/api/users/manuel@mail.com`,
    params
  );

  const data = await initialReq.json();
  return {
    data
  };
};

export default Index;
