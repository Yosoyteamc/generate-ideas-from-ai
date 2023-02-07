import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconArrow from './icons/IconArrow';
import IconEdit from './icons/IconEdit';
import IconChange from './icons/IconChangePosition';
import IconRemove from './icons/IconRemove';
import IconHeart from './icons/IconHeart';
import { intlFormatDistance } from 'date-fns';
import { createOneIdea } from '../service/CohereIA';
import { SettingsContext } from '../context/settingsContext';

const iconReference = 28;


const ShowIdea = () => {

    const location = useLocation();
    const [idea, setIdea] = useState();
    const { settings, setSettings } = useContext(SettingsContext);
    const [date, setDate] = useState('Calculando...');
    const [showNotification, setShowNotification] = useState(false);
    const [loadingOneIdeas, setLoadingOneIdeas] = useState(false);
    // const [confirmRemove, setConfirmRemove] = useState(true);
    const navigate = useNavigate();

    const navigateToMain = () => {
        navigate('/main');
    }
    
    const dateNow = (data) => {
        try {
            const now = new Date();
            const date = new Date(data);
    
            return intlFormatDistance(
                new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()),
                new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()),
                { locale: 'es' }
            )
        } catch (error) {
           
        }
        return 'Calculando...';
    }

    const changeIsFavorite = () => {
        const { userList, settings } = JSON.parse(localStorage.getItem('data'));
        const index = userList.findIndex((user) => user.id === idea.id);
        userList[index].isFavorite = !userList[index].isFavorite;
        localStorage.setItem('data', JSON.stringify({ userList, settings }));
        setIdea(userList[index]);
    }

    const changeIsRead = (id = idea.id) => {
        const { userList, settings } = JSON.parse(localStorage.getItem('data'));
        const newList = userList.map(idea => {
            if(idea.id === id) {
                idea.isRead = true;
            }
            return idea;
        });

        localStorage.setItem('data', JSON.stringify({ userList: newList, settings }));
    }

    const removeIdea = (id = idea.id) => {
        try{
            const { userList, settings } = JSON.parse(localStorage.getItem('data'));
            const newList = userList.filter(ideaToRemove => ideaToRemove.id !== id);
            localStorage.setItem('data', JSON.stringify({ userList: newList, settings }));
            navigateToMain();
        }
        catch(error) {
            // console.log(error);
        }
    }

    const tryRemoveIdea = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    }

    const getUserSettings = () => {
        const userSettings = JSON.parse(localStorage.getItem('data'))?.settings || settings?.settings;
        setSettings(userSettings);
        return userSettings;
    }

    const changeIdea = async (idea) => {
        try {
            getUserSettings();
            setLoadingOneIdeas(true);
            const { userList, settings } = JSON.parse(localStorage.getItem('data'));
            const response = await createOneIdea((idea.position), settings);
            const newList = userList.map(ideaToChange => {
                if(ideaToChange.id === idea.id) {
                    ideaToChange = response;
                }
                return ideaToChange;
            });
            localStorage.setItem('data', JSON.stringify({ userList: newList, settings }));
            setLoadingOneIdeas(false);
            setIdea(response);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const id = location.state;
        const { userList } = JSON.parse(localStorage.getItem('data'));
        const idea = userList.find((user) => user.id === id);
        // console.log(idea);
        setIdea(idea);
        setDate(dateNow(idea?.dateIn));
        changeIsRead(idea?.id);
    }, [location.state]);

    return (
        <div className={`m-4 w-[330px] lg:w-[500px] lg:ml-[100px] mb-24 ${loadingOneIdeas? 'pointer-events-none': 'pointer-events-auto'}`}>
            <div className={`flex relative  ${loadingOneIdeas? 'animate-pulse':''}`}>
                <div className='bg-[#F2F2F2] w-[80%] rounded-t-[2.8rem] h-[55px]'></div>
                <button className=' absolute right-0 top-0 lg:top-[-1px] lg:right-[13px] border-[10px] border-white text-[#0D0D0D] w-min-[20%] rounded-bl-[1rem] min-h-full' onClick={navigateToMain}>
                    <div className=' p-2 px-4 lg:px-6 rounded-2xl bg-[#5CF2AC] hover:bg-[#6638A6] transition-colors duration-500'>
                        <IconArrow className='rotate-[135deg]'></IconArrow>
                    </div></button>
            </div>
            <div className={`bg-[#F2F2F2] py-3 rounded-b-[3rem] rounded-tr-3xl ${loadingOneIdeas? 'animate-pulse':''}`}>
                <span className='px-8 text-lg text-[#797FF2]'>Tiempo de generación: </span>
                <p className='px-8 mb-4 mt-2'>
                    {date}
                </p>
                <span className='px-8 text-lg text-[#797FF2]'>Tipo de perfil:</span>
                <p className='px-8 mb-4 mt-2 capitalize'>
                    {idea?.type}
                </p>
                <span className='px-8 text-lg text-[#797FF2]'>Título de la idea: </span>
                <h2 className={`px-8 mt-2 pb-2 font-semibold text-2xl mb-3`}>
                    {idea?.title}
                </h2>
                <span className='px-8 text-lg text-[#797FF2]'>Descripción relacionada: </span>
                <p className={`px-8 pb-6 mt-4 min-h-min text-lg text-[#0D0D0D]/80 transition-all duration-300 `}>
                     {idea?.description}
                </p>
                <span className='px-8 text-lg text-[#797FF2]'>Hashtags: </span>
                <ul className='px-6 pb-6 flex flex-wrap gap-2 mt-4 mb-16'>
                    {   
                        idea?.hashtags.map((hashtag, index) => {
                            return  <li className={`py-1 px-2 text-sm rounded-md inline-block bg-[#5CF2AC]/50`} key={index}>{hashtag}</li>
                        })
                    }
                </ul>
            </div>
            <div className='px-8  py-5 fixed right-0 bottom-0 w-full bg-white border-t border-[#f2f2f2] lg:w-[80px] lg:h-screen lg:border-l lg:items-center'>
                <ul className='flex justify-between lg:flex-col lg:h-full'>
                    <li className='cursor-pointer'><IconHeart width={iconReference} height={iconReference} fill={idea?.isFavorite? '#6638A6': 'none'} color={ idea?.isFavorite? '#6638A6' :'#0D0D0D'} onClick={ changeIsFavorite} /></li>
                    <li className='cursor-pointer'><IconEdit  width={iconReference} height={iconReference}  color={'#0D0D0D'}/></li>
                    <li className='cursor-pointer'><IconChange width={iconReference} height={iconReference} color={'#0D0D0D'}  onClick={()=>changeIdea(idea)}/></li>
                    <li className='cursor-pointer'><IconRemove  width={iconReference} height={iconReference}  color={'#0D0D0D'} onClick={()=>tryRemoveIdea()}/></li>
                </ul>
            </div>
            {
                showNotification &&
                <div className='fixed w-screen bottom-0 left-0 flex justify-center'>
                <a className='bg-[#F25A44] animate-bounce text-center w-[250px] text-[#0D0D0D] font-medium mb-20 px-4 py-2 rounded-2xl hover:bg-[#F25A44]/80 transition-colors duration-500' onClick={()=>{
                    setShowNotification(false);
                    removeIdea(idea?.id);
                }} >
                    ¡Presiona para confirmar!
                    <span className='text-sm'><br/>U omite el mensaje</span> 
                </a>
            </div>
            }
        </div>
    );
}

export default ShowIdea;
