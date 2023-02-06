import React from 'react';
import { Outlet } from 'react-router-dom';
// import IconSearch from '../components/icons/IconSearch';
import IconSettings from '../components/icons/IconSettings';
// import IconNotification from '../components/icons/IconNotification';
import IconMenu from '../components/icons/IconMenu';

const iconReference = 30;

const MainPage = () => {
    return (
        <section className='flex flex-col items-center relative'>
            <header className='border-b bg-white border-[#f2f2f2] w-screen z-100 relative'>
                <nav className='px-6  py-4'>
                    <ul className='flex justify-between'>
                        <li className='cursor-pointer'><IconMenu width={iconReference} height={iconReference} color={'#0D0D0D'}/></li>
                        <li className='cursor-pointer'><IconSettings width={iconReference} height={iconReference} color={'#0D0D0D'} /></li>
                    </ul>
                </nav>
            </header>
            <Outlet></Outlet>
        </section>
    );
}

export default MainPage;
