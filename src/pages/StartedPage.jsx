import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/settingsContext';
import IconArrow from '../components/icons/IconArrow';

const profile = {
    streamer: {
        tags: [
            'Juegos', 'Competencia de juegos','Just Chatting', 'Música', 'Comentarista de deportes',
            'Desarrollo de videojuegos',
            'Desarrollo de aplicaciones web'
        ]
    },
    instragramer: {
        tags: ['moda y estilo', 'fitness', 'viajes', 'comida', 'belleza', 'mascotas', 'educación', 'entretenimiento', 'deportes', 'comedia', 'música', 'animales', 'humor']
    },
    youtuber: {
        tags: []
    },
    blogger: {
        tags: []
    }
}

const StartedPage = () => {

    const [selectedProfile, setSelectedProfile] = useState('');
    const [listFocus, setListFocus] = useState([]);
    const { setSettings } = useContext(SettingsContext);
    const [error, setError] = useState(false);
    const [select, setSelect] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSelectedProfile(e.target.value);
        setError(false);
        setSelect(true);
    }

    const setOnList = (e) => {
        setError(false);
        if (e.target.checked) {
            setListFocus([...listFocus, e.target.value]);
        } else {
            setListFocus(listFocus.filter( item => item !== e.target.value ));
        }
    }

    const continueTo = () => {
        !select || listFocus.length === 0 ? setError(true) : navigateToMain();
    }

    const navigateToMain = () => {
        changeContext();
        navigate('/main');
    }

    const changeContext = () => {
        setSettings({
            profile: selectedProfile,
            preferences: listFocus
        });
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='w-[80%] md:w-[40%] lg:w-1/3'>
                <h1 className={`${select? 'text-2xl':'text-4xl'} font-semibold transition-all duration-200 `}>Genere contenido colaborando con una IA adaptada a tu perfil.</h1>
                <div className='mt-5 flex justify-between'>
                    <select className='bg-[#F2F2F2] p-2 rounded-lg w-[80%] lg:w-[85%] appearance-none outline-none' onChange={handleChange}>
                        <option value=''>Selecciona un perfil</option>
                        <option value='streamer'>Streamer</option>
                        <option value='instragramer'>Instagramer</option>
                        <option value='youtuber'>Youtuber</option>
                        <option value='blogger'>Blogger</option>
                    </select>
                    <button className={`bg-[#5CF2AC] ml-2 px-3 py-2 font-bold text-xl rounded-lg transition-all duration-200 ${select ?  'bg-[#5CF2AC]': 'rotate-180'} ${error? 'bg-red-400':''}`} onClick={ ()=>{ continueTo() } }><IconArrow></IconArrow></button>
                </div>
                {
                    select && ( 
                        <div className='mt-5'>
                            <p className='text-sm mb-3'>Selecciona un enfoque específico:</p>
                            <ul className='list-none'>
                                {
                                    profile[selectedProfile].tags.map( (tag, index) => (
                                        <li key={index} className='inline'>
                                            <input className='absolute opacity-0 peer' type="checkbox" id={`checkbox${index}`} onChange={ setOnList } value={tag}/>
                                            <label className='cursor-pointer capitalize py-1 px-2 inline-block bg-[#5CF2AC]/20 rounded-md mx-1 whitespace-nowrap my-[3px] select-none transition-all peer-checked:bg-[#5CF2AC] duration-100' htmlFor={`checkbox${index}`}>{tag}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div> 
                    )
                }
            </div>
        </div>
    );
}

export default StartedPage;
