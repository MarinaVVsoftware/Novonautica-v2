// realiza una configuración de los estilos de Material UI
import "../src/bootstrap";
// --- Post bootstrap ---
import React from "react";
import "../src/global.css";
import DashBoardComponent from "../components/Views/DashBoard";
import "isomorphic-fetch";

Index.getInitialProps = async function() {
  // Fetch la información
  const res = await fetch("http://api.myjson.com/bins/xein4");
  const data = await res.json();
  // Retorna el response a un objeto data
  return {
    data: { ...data }
  };
};

function Index(props) {
  return <DashBoardComponent name="Juanito Perez" data={props.data} />;
}

export default Index;
