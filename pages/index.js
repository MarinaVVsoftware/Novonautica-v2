// realiza una configuración de los estilos de Material UI
// --- Post bootstrap ---
import React from "react";
import "../src/global.css";
import DashBoardComponent from "../components/Views/DashBoard";
import getSession from "../helpers/getSession";

function Index(props) {
  return <DashBoardComponent name="Juanito Perez" data={props.data} />;
}

Index.getInitialProps = async ({ res, req }) => {
  if (getSession(req) === 0) {
    if (res) {
      res.writeHead(302, {
        Location: "/login"
      });
      res.end();
      return {};
    }
  }

  const initialReq = await fetch("http://api.myjson.com/bins/xein4");
  const data = await initialReq.json();
  return {
    data
  };
};

export default Index;
