import React, { useContext, useEffect, useState } from 'react';
import { createSuggestions } from '../service/CohereIA';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/settingsContext';
import PreviewIdea from './pure/PreviewIdea';
import IconCreate from './icons/IconCreate';

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
    const [closeMessage, setCloseMessage] = useState(false);
    const [listIdeas, setListIdeas] = useState(listDefault);
    const { settings } = useContext(SettingsContext);
    // const [settingsContext, setSettingsContext] = useState({});
    const navigate = useNavigate();

    const navigateTo = (id) => {
        navigate('/main/idea/' + id);
    }

    useEffect(() => {
        obtainList();
    }, []);

    const obtainList = async () => {
        try {
            const response = JSON.parse(localStorage.getItem('listIdeas')) || await createSuggestions(settings);
            setListIdeas(response);

            response && setLoading(false);
            saveListIdeas(response);
        } catch (error) {
            console.log(error);
        }
    }

    const saveListIdeas = (list) => {
        localStorage.setItem('listIdeas', JSON.stringify(list));
    }


    return (
        <div className={`w-screen p-5`}>
            { <div className='mb-2 w-[330px] m-auto'>
                <div className='flex relative'>
                    <div className='bg-[#5CF2AC] w-[80%] rounded-t-[2.8rem] h-[55px]'></div>
                    <button className='absolute right-[-5px] top-0 border-[10px] border-white text-[#0D0D0D] w-min-[20%] rounded-bl-[1rem]' onClick={()=>{setCloseMessage(!closeMessage)}}><div className='py-[.8rem] px-[1.2rem] rounded-2xl  bg-[#5CF2AC] hover:bg-[#6638A6] transition-colors duration-500'><IconCreate className='-rotate-45 ml-1 scale-110'></IconCreate></div></button>
                </div>
                <div className='bg-[#5CF2AC] py-3 rounded-b-[3rem] mt-[-1px] rounded-tr-3xl'>
                    <h2 className={`px-8 mt-2 pb-2 font-semibold text-3xl`}>Bienvenido</h2>
                    <p className={`px-8 pb-6 text-[#0D0D0D] `}>
                        Hola  ¿Qué tal? Espero que te encuentres muy bien. { loading? 'Estamos generando ': 'Generamos '} algunas ideas para que puedas empezar a crear contenido. 
                        <br/>Lo bueno de este proceso es que puedes guardar las ideas que te parezcan más interesantes, editarlas, eliminarlar o generar más. <br/>{ loading? 'No te preocupes, no tardaremos mucho...': '¡Vamos!'}
                    </p>
                </div>
            </div>
            }
            <ul className={`flex flex-col md:flex-wrap md:flex-row items-center justify-center md:justify-items-center last:mb-14 ${loading? 'animate-pulse pointer-events-none': ''} `}>
                {
                    listIdeas.map((item, index) => (
                        <PreviewIdea key={index} idea={item} loading={loading} navigate={navigateTo}></PreviewIdea>
                    ))
                }
            </ul>
        </div>
    );
}

export default SelectIdeas;
