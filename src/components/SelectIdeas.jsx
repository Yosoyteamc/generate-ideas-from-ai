import React, { useContext, useEffect, useState } from 'react';
import { createSuggestions } from '../service/CohereIA';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/settingsContext';

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
        <div className={`w-screen p-5 ${loading? 'animate-pulse pointer-events-none': ''}`}>
            <ul className='flex flex-col md:flex-wrap md:flex-row items-center justify-center md:justify-items-center'>
                {
                    listIdeas.map((item, index) => (
                        <li key={index} className='m-4 mb-2 w-[330px]'>
                            <div className='flex relative'>
                                <div className='bg-[#F2F2F2] w-[80%] rounded-t-[2.8rem] h-[55px]'></div>
                                <button className=' absolute right-0 top-1 border-[10px] border-white text-[#0D0D0D] w-min-[20%] rounded-bl-[1rem] min-h-full'><p className=' p-2 px-4 rounded-2xl bg-[#5CF2AC] '>{'<-'}</p></button>
                            </div>
                            <div className='bg-[#F2F2F2] py-3 rounded-b-[3rem] rounded-tr-3xl'>
                                <h2 className={`px-8 mt-2 pb-2 font-semibold text-xl ${loading? 'opacity-30':''}`}>{item.title.length > 60 ? item.title.slice(0, 60) + '...' : item.title}</h2>
                                <p className={`px-8 pb-6 text-[#0D0D0D]/70 ${loading? 'opacity-30':''}`}>{item.description.length > 70 ? item.description.slice(0, 70) + '. ' : item.description} 
                                    <button type={'button'} onClick={ ()=>{ navigateTo(item.id) }}><span className='text-[#797FF2] text-sm cursor-pointer'>Ver más...</span></button>
                                </p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default SelectIdeas;
