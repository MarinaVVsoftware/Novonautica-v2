// realiza una configuración de los estilos de Material UI
import "../src/bootstrap";
// --- Post bootstrap ---
import React, { Fragment } from "react";
import '../src/global.css';
import DashBoardComponent from '../components/Views/DashBoard';

function Index() {
  return (
    <Fragment>
      <DashBoardComponent />
    </Fragment>
  );
}

export default Index;
