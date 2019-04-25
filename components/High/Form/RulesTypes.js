const rulesTypes = {};

/** Reglas para Textbox de tipo "string básico": Solo admite string lowercase. */
rulesTypes.basicString = [
  {
    test: /^[a-z0-9_]+$/,
    message: "Username must contain only alphabets-numeric lowercase characters"
  },
  {
    test: value => {
      return value.length <= 10;
    },
    message: "value must be longer than 10 characters"
  }
];

/** Reglas para Textbox de tipo "password": solo admite 10 caracteres. */
rulesTypes.password = [
  {
    test: value => {
      return value.length <= 10;
    },
    message: "value must be longer than 10 characters"
  }
];

export default rulesTypes;
