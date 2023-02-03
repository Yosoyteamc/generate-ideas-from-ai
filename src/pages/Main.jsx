import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <section className='flex flex-col items-center'>
            <h1>Aqui va el logo</h1>
            <Outlet></Outlet>
            <p>Aqui va el footer</p>
        </section>
    );
}

export default Main;
