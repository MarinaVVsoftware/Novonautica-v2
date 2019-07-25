import React from "react";
import "../src/global.css";
import DashBoard from "../components/Views/DashBoard";
import Users from "../components/Views/Users";

function users(props) {
  if (!props) return null;
  return (
    <DashBoard
      name={props.data.user.username}
      menu={JSON.parse(props.data.user.rol.permissions)}>
      <Users />
    </DashBoard>
  );
}

export default users;
