import Home from '../Views/Home';
import Usuarios from '../Views/Usuarios';

/** Poner los componentes para que se mapeen. */
const moduleHandler = {
	Home: <Home />,
	Usuarios: <Usuarios />,
	Roles: <Home />
};

export default moduleHandler;
