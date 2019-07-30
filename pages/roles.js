import React from "react";
import "../src/global.css";
import DashBoard from "../components/Views/DashBoard";
import Roles from "../components/Views/Roles";

function roles(props) {
  if (!props) return null;
  return (
    <DashBoard
      name={props.data.user.username}
      menu={JSON.parse(props.data.user.rol.permissions)}>
      <Roles />
    </DashBoard>
  );
}

export default roles;
