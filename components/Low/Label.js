import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

/** Componente para renderizar texto.
 * @param {string} text Texto que renderizará el componente.
 * @param {string} align Alineación del texto: { inherit, left, center, right, justify }.
 * @param {string} color Color del texto.
 * @param {string} gutterBottom Bottom Margin.
 * @param {string} inline Setea el estilo inline.
 * @param {string} noWrap Si es true el texto no estará "wrap", de lo contraria será truncado en una elipse.
 * @param {string} paragraph Bottom Margin como párrafo.
 * @param {string} variant Tipos de texto: { h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, caption, button, overline }.
 */
function Label(props) {
  return (
    <div>
      <Typography {...props}>{props.text}</Typography>
    </div>
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
