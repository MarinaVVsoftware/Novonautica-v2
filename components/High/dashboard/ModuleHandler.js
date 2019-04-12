import Home from '../../Views/Home';

/**
 * Busca el valor por su llave en componentsMap
 * @param {string} componentKey 
 */
const moduleHandler = componentKey => {
    return componentsMap[componentKey];
};

/**
 * Poner los componentes para que se mapeen.
 */
const componentsMap = {
    'home': <Home />
};

export default moduleHandler;