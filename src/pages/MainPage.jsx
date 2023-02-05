import React from 'react';
import { Outlet } from 'react-router-dom';
// import IconSearch from '../components/icons/IconSearch';
// import IconSettings from '../components/icons/IconSettings';
// import IconNotification from '../components/icons/IconNotification';
// import IconMenu from '../components/icons/IconMenu';


const MainPage = () => {
    return (
        <section className='flex flex-col items-center relative'>
            <Outlet></Outlet>
            {/* <div className='fixed bottom-0 w-screen rounded-xl p-5 shadow-2xl bg-white border-[#F2F2F2]'>
                <ul className='flex items-center justify-between w-full px-6'>
                    <li><IconMenu width={30} height={30} color={'black'}></IconMenu></li>
                    <li><IconSearch width={30} height={30} color={'black'}></IconSearch></li>
                    <li><IconNotification width={30} height={30} color={'black'}></IconNotification></li>
                    <li><IconSettings width={30} height={30} color={'black'}></IconSettings></li>
                </ul>
            </div> */}
        </section>
    );
}

export default MainPage;
