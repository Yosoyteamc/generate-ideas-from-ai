import React from 'react';
import TinderCard from 'react-tinder-card';

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
    return (
        <div className='h-screen border w-screen p-3'>
            <div className=''>
                {
                    listDefault.map((item, index) => (
                        <div
                            key={index}
                            className='swipe'
                        >
                            <div className='border p-2 m-5'>
                                <h1 className=''>{item.title}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                Menu
            </div>
        </div>
    );
}

export default SelectIdeas;
