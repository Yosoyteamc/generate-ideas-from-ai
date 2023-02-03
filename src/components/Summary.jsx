import React from 'react';
import PreviewIdea from './pure/PreviewIdea';
import IconSearch from './icons/IconSearch';

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


const Summary = () => {
    return (
        <div className='border w-screen p-3'>
            <div className='my-5'>
                <p className='font-black text-4xl'>Hoy tienes <span>0</span> nuevas ideas por revisar</p>
            </div>
            <div className='mt-16'>
                <form className='w-full border flex items-center'>
                    <button>
                        <IconSearch width={25} height={25} className='mx-3' ></IconSearch>
                    </button>
                    <input className='p-2 w-full outline-none' type={'text'} placeholder='Buscar ideas...'></input>
                </form>
            </div>
            <div className='mt-8'>
                <ul className='mt-6'>
                    {
                       listDefault.map((idea, index) => {
                            return ( <PreviewIdea key={index} idea = {idea} lastchild={index === listDefault.length}/> )})
                    }
                </ul>
            </div>
        </div>
    );
}

export default Summary;
