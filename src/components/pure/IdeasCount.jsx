import React from 'react';
import IconCreate from '../icons/IconCreate';

const IdeasCount = ({loadingOneIdea, listIdeas, obtainNewElement}) => {
    return (
        <>
            <div className='mb-2 slide-in-top flex flex-col items-start sm:items-center relative z-0'>
                <h2 className={`${listIdeas.length < 9? 'md:text-5xl leading-[1.2] text-[2.8rem]': 'md:text-[1.3] leading-[3.1rem] text-[2.7rem]' } font-semibold mb-6`}>Ideas generadas {`(${listIdeas.length})`}</h2>
                <button className={`bg-[#5CF2AC] text-[#0D0D0D] px-4 py-2 rounded-2xl hover:text-white hover:bg-[#6638A6] transition-colors duration-500 flex items-center ${loadingOneIdea? 'pointer-events-none': 'pointer-events-auto'}`} onClick={obtainNewElement}>
                    <IconCreate className={`mr-2 ${loadingOneIdea? 'animate-spin scale-75':''}`}></IconCreate>
                    { loadingOneIdea? 'Procesando...':'Generar otra idea'}
                </button>
            </div>   
        </>
    );
}

export default IdeasCount;
