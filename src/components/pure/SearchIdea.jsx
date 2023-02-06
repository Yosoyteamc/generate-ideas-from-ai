import React, { useRef, useState } from 'react';
import PreviewIdea from './PreviewIdea';
import IconSearch from '../icons/IconSearch';
import { useNavigate } from 'react-router-dom';

const SearchIdea = ({listIdeas}) => {

    const inputSearch = useRef();
    const [listIdeasFilter, setListIdeasFilter] = useState([]);
    const navigate = useNavigate();

    const searchIdea = (e) => {
        e.preventDefault();
        const value = inputSearch.current.value;
        const newList = listIdeas.filter((idea) => {
            return idea.title.includes(value.toLowerCase()) || idea.description.includes(value.toLowerCase()) ;
        });
        newList.length === 0 && (()=>{
            inputSearch.current.parentNode.style.border = '1px solid #F25A44';
            // inputSearch.current.parentNode.classList.add('wobble-hor-bottom');
            setTimeout(() => {
                inputSearch.current.parentNode.style.border = '1px solid #F2F2F2';
                // inputSearch.current.parentNode.classList.remove('wobble-hor-bottom');
            }, 1500);
        })();
        setListIdeasFilter(newList);
        inputSearch.current.value = '';
    }

    const navigateTo = (id) => {
        navigate('/main/idea/' + id, { state: id});
    }

    return (
        <>
            <div className='w-full mb-10'>
                <form className='flex bg-[#F2F2F2] items-center rounded-lg px-4' onSubmit={searchIdea}>
                    <IconSearch width={24} height={24}></IconSearch>
                    <input ref={inputSearch} className='text-[#0D0D0D] bg-transparent p-3 rounded-lg w-full appearance-none outline-none' type='text' placeholder='Buscar ideas...'/> 
                </form>
            </div>
            {
                listIdeasFilter.length > 0 && 
                <ul className='px-3 flex justify-center flex-col'>
                    {
                        listIdeasFilter.map((idea) => (
                                <PreviewIdea key={idea.id} className='mb-4' idea={idea} navigate={navigateTo}></PreviewIdea>
                        ))
                    }
                    <button className='mb-16 text-[#0d0d0d]/60 animate-pulse' onClick={()=>{setListIdeasFilter([])}}>Eliminar busqueda...</button>
                </ul>
            }
        </>
    );
}

export default SearchIdea;
