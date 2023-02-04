import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <section className='flex flex-col items-center'>
            {/* <p>Aqui va el header</p> */}
            <Outlet></Outlet>
            {/* <p>Aqui va el footer</p> */}
        </section>
    );
}

export default Main;
