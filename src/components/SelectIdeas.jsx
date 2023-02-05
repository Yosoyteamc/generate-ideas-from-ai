import React, { useContext, useEffect, useRef, useState } from 'react';
import { createOneSuggestion, createSuggestions } from '../service/CohereIA';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/settingsContext';
import PreviewIdea from './pure/PreviewIdea';
import IconCreate from './icons/IconCreate';
import IconArrow from './icons/IconArrow';

const listDefault = [
    {
        id: 1,
        type: 'Teaching Software',
        title: '5 Preguntas frecuentes para la posición de Software Ingineer.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        hashtags: ['#software', '#ingineer', '#developer', '#frontend', '#backend', '#fullstack'],
        position: 0,
        isFavorite: false,
        isRead: false,
        date: '30 de Enero'
    },
    {
        id: 2,
        type: 'Teaching Software',
        title: 'Como mejorar tu perfil de LinkedIn para tener más...',
        description: '¿Cómo se calcula el tamaño de un producto de software? 2. ¿Qué significa el diagrama de flujo de datos de nivel 0?',
        hashtags: ['#software', '#ingineer', '#developer'],
        position: 1,
        isFavorite: false,
        isRead: false,
        date: '29 de Enero'
    },
    {
        id: 1,
        type: 'Teaching Software',
        title: '5 Preguntas frecuentes para la posición de Software Ingineer.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        hashtags: ['#software', '#ingineer', '#developer', '#frontend', '#backend', '#fullstack'],
        position: 0,
        isFavorite: false,
        isRead: false,
        date: '30 de Enero'
    },
    {
        id: 2,
        type: 'Teaching Software',
        title: 'Como mejorar tu perfil de LinkedIn para tener más...',
        description: '¿Cómo se calcula el tamaño de un producto de software? 2. ¿Qué significa el diagrama de flujo de datos de nivel 0?',
        hashtags: ['#software', '#ingineer', '#developer'],
        position: 1,
        isFavorite: false,
        isRead: false,
        date: '29 de Enero'
    },
    {
        id: 1,
        type: 'Teaching Software',
        title: '5 Preguntas frecuentes para la posición de Software Ingineer.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        hashtags: ['#software', '#ingineer', '#developer', '#frontend', '#backend', '#fullstack'],
        position: 0,
        isFavorite: false,
        isRead: false,
        date: '30 de Enero'
    }
]


const SelectIdeas = () => {

    const [loading, setLoading] = useState(true);
    // const [logged, setLogged] = useState(false);
    const [closeMessage, setCloseMessage] = useState(false);
    const [listIdeas, setListIdeas] = useState(listDefault);
    const { settings, setSettings } = useContext(SettingsContext);
    const [showNotification, setShowNotification] = useState(false);
    const welcomeMessage = useRef();
    // const notificationMessage = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        obtainData();
    }, []);

    useEffect(() => {
        !loading && setTimeout(() => {
            setCloseMessage(true);
        }, 5000);
    }, [loading]);

    const navigateTo = (id) => {
        navigate('/main/idea/' + id);
    }

    const obtainData = async () => {
        try {
            const response = JSON.parse(localStorage.getItem('data')) || await createSuggestions(settings);
            setListIdeas(response?.userList || response);
            response && setLoading(false);
            // response?.userList && setCloseMessage(true);

            saveData(response?.userList || response, response?.settings || settings);
            setSettings(response?.settings);
        } catch (error) {
            console.log(error);
        }
    }

    const saveData = (list, userSettings) => {
        localStorage.setItem('data', JSON.stringify({
            userList: list,
            settings: userSettings
        }));
    }

    const obtainNewElement = async () => {
        try {
            const response = await createOneSuggestion( listIdeas.length+1, settings);
            const newList = [...listIdeas, response];
            setListIdeas(newList);
            saveData(newList, settings);
            setShowNotification(true);
        } catch (error) {
            console.log(error);
        }
    }

    const closedWhitAnimation = () => {
        setTimeout(() => {
            welcomeMessage.current.style.display = 'none';
        }, 200);
        return  'slide-out-top'
    }

    return (
        <div className={`w-screen p-5 relative max-w-[1200px] flex flex-col items-center`}>
            <div ref={welcomeMessage} className={`mb-2 w-[330px] ${closeMessage? closedWhitAnimation():'' }`}>
                <div className='flex relative'>
                    <div className='bg-[#5CF2AC] w-[80%] rounded-t-[2.8rem] h-[55px]'></div>
                    <button className='absolute right-[-5px] top-0 border-[10px] border-white text-[#0D0D0D] w-min-[20%] rounded-bl-[1rem]' onClick={()=>{setCloseMessage(!closeMessage)}}><div className='py-[.8rem] px-[1.2rem] rounded-2xl  bg-[#5CF2AC] hover:bg-[#6638A6] transition-colors duration-500'><IconCreate className='-rotate-45 ml-1 scale-110'></IconCreate></div></button>
                </div>
                <div className='bg-[#5CF2AC] py-3 rounded-b-[3rem] mt-[-1px] rounded-tr-3xl'>
                    <h2 className={`px-8 mt-2 pb-2 font-semibold text-3xl`}>Bienvenido</h2>
                    <p className={`px-8 pb-6 text-[#0D0D0D] `}>
                        Hola  ¿Qué tal? { loading? 'Estamos generando ': 'Generamos '} algunas ideas para que puedas empezar a crear contenido. No queremos  quitarte parte del proceso creativo, pero si darte un poco de ayuda.
                        Lo bueno es que desde ahora ${loading? 'podrás':'puedes'} guardar las ideas que te parezcan más interesantes, editarlas, eliminarlas o generar más. <br/><br/>{ loading? 'No tardaremos mucho...': '¡Vamos!'}
                    </p>
                </div>
            </div>
            {
                !loading && closeMessage &&              
                <div className='mb-8 slide-in-top flex flex-col items-start sm:items-center'>
                    <h2 className={`${listIdeas.length < 9? 'md:text-5xl leading-[1.2] text-[2.8rem]': 'md:text-[1.3] leading-[3.1rem] text-[2.7rem]' } font-semibold mb-6`}>Ideas generadas {`(${listIdeas.length})`}</h2>
                    <button className='bg-[#5CF2AC] text-[#0D0D0D] px-4 py-2 rounded-2xl hover:bg-[#6638A6] transition-colors duration-500 flex items-center' onClick={obtainNewElement}>
                        <IconCreate className='mr-2'></IconCreate>Generar otra idea
                    </button>
                </div>
            }
            <ul className={`flex flex-col md:flex-wrap md:flex-row items-center justify-center md:justify-items-center last:mb-14 ${loading? 'animate-pulse pointer-events-none': ''} `}>
                {
                    listIdeas.map((item, index) => (
                        <PreviewIdea key={index} index={index} idea={item} loading={loading} navigate={navigateTo}></PreviewIdea>
                    ))
                }
            </ul>
            {
                showNotification &&
                <div className='fixed w-screen bottom-0 left-0 flex justify-center'>
                <a className='bg-[#5CF2AC] animate-bounce text-[#0D0D0D] m-6 px-4 py-2 rounded-2xl hover:bg-[#6638A6] transition-colors duration-500 flex items-center' href={`#idea${listIdeas.length-1}`} onClick={()=>{
                    setShowNotification(false);
                }} >
                    Tienes una idea nueva <IconArrow className='ml-2 rotate-90 scale-75'></IconArrow>
                </a>
            </div>
            }
        </div>
    );
}

export default SelectIdeas;
