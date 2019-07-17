const rulesTypes = {};

rulesTypes.basicString = [
  {
    test: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
    message: "Texto invalido, no debe contener carácteres especiales. "
  },
  {
    test: value => {
      return value.length <= 10;
    },
    message: "Texto inválido, debe ser menor a 10 carácteres. "
  }
];

/** Reglas para Textbox de tipo "string básico": Solo admite string lowercase. */
rulesTypes.lowercase = [
  {
    test: /^[a-z0-9_]+$/,
    message: "Texto invalido, solo debe tener minúsculas. "
  }
];

/** Reglas para Textbox de tipo "password": solo admite 10 caracteres. */
rulesTypes.password = [
  {
    test: value => {
      return value.length <= 10;
    },
    message: "Contraseña inválida, debe ser menor a 10 carácteres. "
  }
];

rulesTypes.email = [
  {
    test: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Email inválido. "
  }
];

rulesTypes.numeric = [
  {
    test: /[0-9]/,
    message: "Formato inválido, sólo se acepta números. "
  }
];

export default rulesTypes;
