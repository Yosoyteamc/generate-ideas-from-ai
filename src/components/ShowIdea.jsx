import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconArrow from './icons/IconArrow';
import IconEdit from './icons/IconEdit';
import IconChangeSuggestion from './icons/IconChangePosition';
import IconRemove from './icons/IconRemove';
import IconHeart from './icons/IconHeart';

const iconReference = 28;


const ShowIdea = () => {

    const location = useLocation();
    const [idea, setIdea] = useState();
    const navigate = useNavigate();

    const navigateToMain = () => {
        navigate('/main');
    }
    
    useEffect(() => {
        const id = location.state;
        const { userList } = JSON.parse(localStorage.getItem('data'));
        const idea = userList.find((user) => user.id === id);
        setIdea(idea);
    }, [location.state]);

    return (
        <div className='m-4 w-[330px] mb-24'>
            <div className='flex relative'>
                <div className='bg-[#F2F2F2] w-[80%] rounded-t-[2.8rem] h-[55px]'></div>
                <button className=' absolute right-0 top-1 border-[10px] border-white text-[#0D0D0D] w-min-[20%] rounded-bl-[1rem] min-h-full' onClick={navigateToMain}><div className=' p-2 px-4 rounded-2xl bg-[#5CF2AC] hover:bg-[#6638A6] transition-colors duration-500'><IconArrow className='rotate-[135deg]'></IconArrow></div></button>
            </div>
            <div className='bg-[#F2F2F2] py-3 rounded-b-[3rem] rounded-tr-3xl'>
                <span className='px-8 text-lg text-[#797FF2]'>Fecha de generación: </span>
                <h3 className='px-8 mb-4 mt-2'>
                    {idea?.date}
                </h3>
                <span className='px-8 text-lg text-[#797FF2]'>Tipo: </span>
                <h3 className='px-8 mb-4 mt-2'>
                    {idea?.type}
                </h3>
                <span className='px-8 text-lg text-[#797FF2]'>Titulo: </span>
                <h2 className={`px-8 mt-2 pb-2 font-semibold text-2xl mb-3`}>
                    {idea?.title}
                </h2>
                <span className='px-8 text-lg text-[#797FF2]'>Descripción relacionada: </span>
                <p className={`px-8 pb-6 mt-4 min-h-min text-lg text-[#0D0D0D]/80 transition-all duration-300 `}>
                     {idea?.description}
                </p>
                <span className='px-8 text-lg text-[#797FF2]'>Hashtags: </span>
                <ul className='px-6 flex flex-wrap gap-2 mt-4 mb-8'>
                    {   
                        idea?.hashtags.map((hashtag, index) => {
                            return  <li className={`py-1 px-2 text-sm rounded-md inline-block bg-[#5CF2AC]/50`} key={index}>{hashtag}</li>
                        })
                    }
                </ul>
            </div>
            <div className='px-8  py-5 fixed right-0 bottom-0 w-full bg-white border-t border-[#f2f2f2]'>
                <ul className='flex justify-between'>
                    <li className='cursor-pointer'><IconHeart width={iconReference} height={iconReference} color={'#0D0D0D'} /></li>
                    <li className='cursor-pointer'><IconEdit  width={iconReference} height={iconReference}  color={'#0D0D0D'}/></li>
                    <li className='cursor-pointer'><IconChangeSuggestion width={iconReference} height={iconReference} color={'#0D0D0D'} /></li>
                    <li className='cursor-pointer'><IconRemove  width={iconReference} height={iconReference}  color={'#0D0D0D'} /></li>
                </ul>
            </div>
        </div>
    );
}

export default ShowIdea;
