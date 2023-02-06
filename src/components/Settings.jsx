import React, { useContext, useEffect, useState } from 'react';
import IconChangeSuggestion from './icons/IconChangePosition';
import { SettingsContext } from '../context/settingsContext';
import { profile } from '../constants/dataPerDefault';


const Settings = () => {

    const [selectedProfile, setSelectedProfile] = useState('default');
    const [newProfile, setNewProfile] = useState('');
    const [listFocus, setListFocus] = useState([]);
    const {setting, setSettings} = useContext(SettingsContext);
    const [error, setError] = useState(false);
    const [save , setSave] = useState(false);

    const handleChange = (e) => {
        setNewProfile(e.target.value);
        setError(false);
    }

    const changeProfile = () => {
        if (newProfile === '' || newProfile === 'default' || newProfile === selectedProfile) {
            setError(true);
        } else {
            setSelectedProfile(newProfile);
            setListFocus([]);
            setError(false);
        }
    }

    useEffect(() => {
        const { settings } = JSON.parse(localStorage.getItem('data'));
        setSelectedProfile(settings.profile);
        setListFocus(settings.preferences);
        // console.log(settings);
    }, []);

    const setOnList = (e) => {
        setError(false);
        setSave(true);
        if (e.target.checked) {
            setListFocus([...listFocus, e.target.value]);
        } else {
            setListFocus(listFocus.filter( item => item !== e.target.value ));
        }
        
    }

    const saveSettings = () => {
        if(listFocus.length === 0) {
            setSave(false);
            return;
        }

        const data = JSON.parse(localStorage.getItem('data'));
        data.settings = {
            profile: selectedProfile,
            preferences: listFocus
        }
        setSettings(data.settings);
        localStorage.setItem('data', JSON.stringify(data));
    }

    return (
        <div className='w-screen'>
            <div className='w-full px-6 py-3'>
                <h1 className='text-2xl font-bold mb-3'>Configuraciones</h1>
                <div className='rounded-lg my-3 bg-[#5CF2AC]/50'>
                    <div className='p-4 text-sm'>
                        <p>Recuerde que los cambios que realice en esta sección pueden afectar el funcionamiento de la aplicación.<br/></p>
                        <p className='my-2'>- Una vez cambiado su perfil, la aplicación no podrá mostrarle contenido relacionado con ese perfil.</p>
                        <p className='my-2'>- Debe tener al menos una preferencia selecionada o los cambios no se guardarán.</p>
                    </div>
                </div>
                <div className='border-b mb-3 mt-6'>
                    <h2 className='font-semibold text-xl mb-2'>Cambiar perfil:</h2>
                    <p className='mb-2'>Su perfil actual es: <span className='text-[#6638A6]  capitalize'>{selectedProfile}</span>, puedes cambiarlo a uno de las siguientes opciones:</p>
                    <div className='mt-5 flex justify-between mb-6'>
                        <select className='bg-[#F2F2F2] p-2 rounded-lg w-[80%] lg:w-[85%] appearance-none outline-none' onChange={handleChange}>
                            <option value='default'>Selecciona un perfil</option>
                            <option value='streamer'>Streamer</option>
                            <option value='instragramer'>Instagramer</option>
                            <option value='youtuber'>Youtuber</option>
                            <option value='blogger'>Blogger</option>
                        </select>
                    <button className={`bg-[#5CF2AC] ml-2 px-3 py-2 font-bold text-xl rounded-lg transition-all duration-200 ${error? 'bg-red-400':''}`} onClick={()=>{ changeProfile() }} ><IconChangeSuggestion color={'#0d0d0d'}></IconChangeSuggestion></button>                </div>
                </div>
                <div className='mb-6 border-b'>
                    <h2 className='font-semibold text-xl mb-2'>Cambiar preferencias:</h2>
                    <div className='mt-3 mb-6'>
                        <p className='text-md mb-3'>Aquí tiene la lista de preferencias para su perfil, puede cambiar o añadir más:</p>
                        <p className='mb-3 text-sm'>Acualmente tiene selecionada {`(${listFocus.length})`}</p>
                        <ul className='list-none'>
                            {  
                                selectedProfile !== 'default' &&
                                profile[selectedProfile]?.tags.map( (tag, index) => (
                                        <li key={index} className='inline'>
                                            <input className='absolute opacity-0 peer' checked={listFocus.includes(tag)} type="checkbox" id={`checkbox${index}`} onChange={ setOnList } value={tag}/>
                                            <label className='cursor-pointer capitalize py-1 px-2 inline-block bg-[#5CF2AC]/20 rounded-md mx-1 whitespace-nowrap my-[3px] select-none transition-all peer-checked:bg-[#5CF2AC] duration-100' htmlFor={`checkbox${index}`}>{tag}</label>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>
                
                <div className='mb-6 border-b'>
                    <h2 className='font-semibold text-xl mb-2'>Guardar cambios:</h2>
                    <div className='mt-3 mb-6'>
                        <p className='text-md mb-3'>Si desea guardar los cambios realizados, puede hacerlo aquí:</p>
                        <p className='mb-4 text-sm'>Tenga en cuenta que esta acción no se puede deshacer.</p>
                        <button className={`bg-[#5CF2AC] px-4 py-2  rounded-lg transition-all duration-200 ${!save? 'pointer-events-none text-black/25':'' }`} onClick={()=>{ saveSettings()  }}>Guardar cambios</button>
                    </div>
                </div>
                
                <div>
                    <h2 className='font-semibold text-xl mb-2'>Eliminar todas las ideas:</h2>
                    <div className='mt-3 mb-6'>
                        <p className='text-md mb-3'>Si desea eliminar todos los datos generados de la aplicación con sus ajustes anteriores, puede hacerlo aquí:</p>
                        <p className='mb-4 text-sm'>Tenga en cuenta que esta acción no se puede deshacer.</p>
                        <button className='bg-[#F25A44] px-4 py-2  text-white rounded-lg transition-all duration-200' onClick={()=>{ localStorage.clear('data') }}>Eliminar datos</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
