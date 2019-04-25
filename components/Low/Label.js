import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  formHelper: {
    color: "#f44336",
    marginBottom: "0",
    fontSize: "0.6rem",
    fontWeight: "0 !important",
    lineHeight: "1.2"
  }
}));

/** Componente para renderizar texto.
 * @param {string} props.children Texto que renderizará el componente.
 * @param {string} align Alineación del texto: { inherit, left, center, right, justify }.
 * @param {string} gutterBottom Bottom Margin.
 * @param {string} inline Setea el estilo inline.
 * @param {string} noWrap Si es true el texto no estará "wrap", de lo contraria será truncado en una elipse.
 * @param {string} paragraph Bottom Margin como párrafo.
 * @param {string} variant Tipos de texto: { h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, caption, button, overline, helperText }.
 */
function Label(props) {
  const classes = useStyles();

  return (
    <Typography
      className={props.variant == "helperText" ? classes.formHelper : ""}
      text={props.text}
      align={props.align}
      gutterBottom={props.gutterBottom}
      inline={props.inline}
      noWrap={props.noWrap}
      paragraph={props.paragraph}
      variant={props.variant != "helperText" ? props.variant : "body2"}
      component={"span"}
    >
      {props.children}
    </Typography>
  );
}

Label.propTypes = {
  text: PropTypes.string
};

Label.defaultProps = {
  text: "default text",
  align: "left",
  gutterBottom: false,
  inline: false,
  noWrap: false,
  paragraph: false,
  variant: "body1"
};

export default Label;
