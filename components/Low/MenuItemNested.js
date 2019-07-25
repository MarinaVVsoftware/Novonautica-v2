import React, { useState } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Explore from "@material-ui/icons/Explore";
import iconHandler from "../Handlers/IconHandler";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import Link from "next/Link";
import lowerCase from "../../helpers/lowerCase";

const useStyles = makeStyles(theme => ({
  color: {
    color: "#e7e7e7 !important"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  link: {
    display: "flex",
    textDecoration: "none",
    width: "100%"
  }
}));

/**
 *
 * @param {object} item Recupera el menu anidado.
 * @param {func} handleClick Función para realizar el click.
 * @param {func} handleDrawerClose Función para cerrar el drawer.
 */
function MenuItemNested(props) {
  const classes = useStyles();
  const menuItem = props.item;
  return (
    <ListItem
      button
      className={classes.nested}
      // Se realiza la funcion del handleClick traida desde props
      onClick={() => props.handleClick(props)}>
      <Link href={"/" + lowerCase(menuItem.subModuleName)}>
        <a className={classes.link}>
          <Tooltip title={menuItem.subModuleName} placement="right-start">
            <ListItemIcon className={classes.color}>
              {iconHandler[menuItem.subModuleName] ? (
                iconHandler[menuItem.subModuleName]
              ) : (
                <Explore />
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText
            classes={{ primary: classes.color }}
            primary={menuItem.subModuleName}
          />
        </a>
      </Link>
    </ListItem>
  );
}

MenuItemNested.proptype = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleModuleChange: PropTypes.func.isRequired
};

export default MenuItemNested;
