// realiza una configuración de los estilos de Material UI
// --- Post bootstrap ---
import React from "react";
import "../src/global.css";
import DashBoardComponent from "../components/Views/DashBoard";
import Home from "../components/Views/Home";
import getSession, { getSessionLength } from "../helpers/getSession";
import jsCookie from "js-cookie";
import Router from "next/router";
import fetch from "isomorphic-fetch";

function Index(props) {
  console.log(props);
  return null;
}

Index.getInitialProps = async ({ res, req }) => {};

export default Index;
