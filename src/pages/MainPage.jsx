import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import IconSearch from '../components/icons/IconSearch';
// import IconSettings from '../components/icons/IconSettings';
import IconNotification from '../components/icons/IconNotification';
import IconMenu from '../components/icons/IconMenu';
import IconCreate from '../components/icons/IconCreate';

const iconReference = 30;

const MainPage = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [ideas , setIdeas] = useState(0);
    const [favorites, setFavorites] = useState(0);
    const [notificationActive, setNotificationActive] = useState(false);
    const location = useLocation();
    // console.log(location);

    const navigate = useNavigate(); 

    useEffect(() => {
        showMenu && obtainFavorites();
    }, [showMenu]);
        

    const obtainFavorites = () => {
        try{
            const response = JSON.parse(localStorage.getItem('data'));
            
            if(!response){
                return;
            }

            const userList = response?.userList;
            const favorites = userList.reduce((acc, item) => {
                if(item.isFavorite){
                    acc++;
                }
                return acc;
            }, 0);

            setIdeas(userList.length);
            setFavorites(favorites);
        }
        catch(e){
            // console.log(e);
        }
    }

    const navigateTo = (path) => {
        navigate(path);
        setShowMenu(false);
    }

    const navigateToStarted = () => {
        localStorage.clear('data');
        navigate('/');
    }

    return (
        <section className='flex flex-col items-center relative overflow-hidden'>
            <header className='border-b bg-white border-[#f2f2f2] w-screen z-100 relative'>
                <nav className='px-6  py-4'>
                    <ul className='flex justify-between items-center'>
                        <li className='cursor-pointer' onClick={()=>{setShowMenu(!showMenu)}}><IconMenu width={iconReference} height={iconReference} color={'#0D0D0D'}/></li>
                        <li className='cursor-pointer relative' onClick={()=>{setShowNotification(!showNotification)}}>
                            { notificationActive && <div className='absolute animate-pulse bg-[#5CF2AC] w-3 h-3 right-0 top-[2px] rounded-full'></div>}
                            <IconNotification width={iconReference-2} height={iconReference-2} color={'#0D0D0D'} />
                        </li>
                    </ul>
                </nav>
            </header>
                <div className={`w-screen z-[999] h-screen fixed bg-white shadow-xl transition-all duration-400 ${showMenu? 'left-0':'-left-full'}`}>
                    <div className='border-b bg-white border-[#f2f2f2 px-6 py-4 flex justify-end'>
                        <div className='cursor-pointer' onClick={()=>{setShowMenu(!showMenu)}}><IconCreate className='scale-[1.75] rotate-45 relative top-5' strokeWidth={1} width={iconReference} height={iconReference} color={'#0D0D0D'}/></div>
                    </div>
                    <ul className='px-8 mt-10 flex flex-col gap-5 text-4xl font-medium'>
                        { location.pathname.includes('/main/') && <li className=' cursor-pointer hover:text-[#6638A6]' onClick={()=>navigateTo('/main')}>Ver ideas {`(${ideas})`}</li>}
                        <li className=' cursor-pointer hover:text-[#6638A6]'>Ver Favoritos {`(${favorites})`}</li>
                        <li className=' cursor-pointer hover:text-[#6638A6]' onClick={()=>navigateTo('/main/settings')}>Ajustes</li>
                        <li className=' cursor-pointer hover:text-[#6638A6]' onClick={()=>navigateToStarted()}>Salir</li>
                    </ul>
                </div>
                <div className={`w-screen z-[999] h-screen fixed bg-white shadow-xl transition-all duration-400 ${showNotification? 'right-0':'-right-full'}`}>
                    <div className='border-b bg-white border-[#f2f2f2 px-6 py-4 flex justify-start'>
                        <div className='cursor-pointer' onClick={()=>{setShowNotification(!showNotification)}}><IconCreate className='scale-[1.75] rotate-45 relative top-5' strokeWidth={1} width={iconReference} height={iconReference} color={'#0D0D0D'}/></div>
                    </div>
                    <ul className='px-8 mt-10 flex flex-col gap-5 text-lg'>
                        <li className='cursor-pointer text-gray-400'>Aún no estan disponibles</li>
                    </ul>
                </div>
            <Outlet></Outlet>
        </section>
    );
}

export default MainPage;
