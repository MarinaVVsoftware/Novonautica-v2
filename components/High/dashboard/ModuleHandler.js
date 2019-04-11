import Home from '../../Views/Home';

const moduleHandler = componentKey => {
    return componentsMap[componentKey];
};

const componentsMap = {
    'home': <Home />
};

export default moduleHandler;