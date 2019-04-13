// realiza una configuración de los estilos de Material UI
import "../src/bootstrap";
// --- Post bootstrap ---
import React, { Fragment } from "react";
import '../src/global.css';
import DashBoardComponent from '../components/Views/DashBoard';
import 'isomorphic-fetch';

Index.getInitialProps = async function() {
  const res = await fetch('https://api.myjson.com/bins/jzefo');
  const data = await res.json();
  return {
    data: {...data}
  }
}

function Index(props) {
  return (
    <Fragment>
      <DashBoardComponent name="Juanito Perez" menu={props.data} />
    </Fragment>
  );
}

export default Index;
