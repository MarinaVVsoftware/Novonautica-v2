import React from "react";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExitApp from "@material-ui/icons/ExitToApp";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles(theme => ({
  color: {
    color: "#e7e7e7 !important"
  },
  colorRed: {
    color: "#E53935 !important"
  }
}));

const handleClick = handleDrawerClose => {
  handleDrawerClose();
};

function ListComponent(props) {
  const classes = useStyles();
  return (
    <div>
        <Divider />
        <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                <ListItem
                    button
                    key={text}
                    onClick={() => handleClick(props.handleDrawerClose)}
                >
                    <ListItemIcon className={classes.color}>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.color }} primary={text} />
                </ListItem>
            ))}
        </List>
        <div>
            <Divider />
            <ListItem 
                button 
                key={'exit'} 
                onClick={() => handleClick(props.handleDrawerClose)}
            >
                <ListItemIcon className={classes.colorRed}>
                    <ExitApp />
                </ListItemIcon>
                <ListItemText classes = {{ primary: classes.color }} primary={"Salir"} />  
            </ListItem>
        </div>
    </div>
  );
}

export default ListComponent;
