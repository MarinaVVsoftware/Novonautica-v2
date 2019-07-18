// lista de nombres de los forms
// lista de relación reglas->error de cada form
// la manera de relacionar una regla con el form es mediante "types" de reglas.

// cada form se le incluyen 3 estados: errors[], valid(bool) y state(string).

/** Retorna un objeto "structure" que contiene las reglas para
 * textboxs y sus estados.
 *  @param {Array} keys Arreglo de strings con los nombres de los componentes.
 *  @param {Array} types Arreglo de tipos basados en el object.RulesTypes
 */
class StructureForm {
  structure = {};

  constructor(params) {
    this.params = params;

    this.CreateStructure();

    return this.structure;
  }

  CreateStructure() {
    /* Manejo de error: valida que el prop sea de tipo Array */
    if (this.params instanceof Array) {
      /* Añade un elemento estructural asociado a la key con sus reglas */
      this.params.forEach(element => {
        this.structure[element.key] = {
          type: element.type,
          rules: element.rules,
          errors: [],
          valid: true,
          state: ""
        };
      });
    }
  }
}

export default StructureForm;
