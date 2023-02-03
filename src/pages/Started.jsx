import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/main');
    }

    return (
        <div>
            <h1>Inicio</h1>
            <button onClick={handleClick}>Ingresar</button>
        </div>
    );
}

export default Inicio;
