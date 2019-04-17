import React from 'react';
import Container from '../Low/Container';
import CheckBox from '../Low/CheckBox';

function Rh() {
    const checkBoxState = newState => {
        const checkBoxState = {...newState};
        console.log(checkBoxState);
        return checkBoxState;
    };

    return (
        <div>
            Test from RH module!
            <CheckBox values={['Crear', 'Leer', 'Holo']} checkBoxState={checkBoxState} />
        </div>
    )
}

export default Rh;