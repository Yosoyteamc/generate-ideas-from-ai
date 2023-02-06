import React, { useState } from 'react';
import IconArrow from '../icons/IconArrow';


const PreviewIdea = ({idea, index, loading, navigate}) => {

    const [maximize, setMaximize] = useState(false);

    return (
        <li id={'idea'+index} className='m-4 mb-2 w-[330px]'>
            <div className='flex relative '>
                <div className='bg-[#F2F2F2] w-[80%] rounded-t-[2.8rem] h-[55px]'></div>
                <button className=' absolute right-0 top-1 border-[10px] border-white text-[#0D0D0D] w-min-[20%] rounded-bl-[1rem] min-h-full' onClick={ ()=>{ navigate(idea.id) } }><div className=' p-2 px-4 rounded-2xl bg-[#5CF2AC] hover:bg-[#6638A6] transition-colors duration-500 shadow-md'><IconArrow className='-rotate-45'></IconArrow></div></button>
            </div>
            <div className='bg-[#F2F2F2] py-3 rounded-b-[3rem] rounded-tr-3xl shadow'>
                <h2 className={`px-8 mt-2 pb-2 font-semibold text-xl ${loading? 'opacity-30':''}`}>{idea.title.length > 60 ? idea.title.slice(0, 60) + '...' : idea.title}</h2>
                <p className={`px-8 pb-6 min-h-min text-[#0D0D0D]/70 transition-all duration-300 ${loading? 'opacity-30':''}`}>
                    {  !maximize? idea.description.length > 70 ? idea.description.slice(0, 70) + '. ' : idea.description: idea.description } 
                    <button type={'button'} onClick={()=>setMaximize(!maximize)}><span className='text-[#797FF2] text-sm cursor-pointer ml-1'> { !maximize ? ' Ver más...':' Ver menos...'}</span></button>
                </p>
            </div>
        </li>
    );
}

export default PreviewIdea;
