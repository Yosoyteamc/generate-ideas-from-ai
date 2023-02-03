import React from 'react';
import IconHeart from '../icons/IconHeart';

const PreviewIdea = ({idea, lastchild}) => {
    return (
        <li>
            <div className={`border-2  bg-white p-4 pb-6 -mt-4 ${lastchild? 'rounded-3xl': ' rounded-t-3xl'}`}>
                <div className='flex justify-between mb-0 mt-1'>
                    <span className='text-xs'>{idea.date}</span>
                    <IconHeart className="mr-2 hover:scale-x-110" width={20} height={20}></IconHeart>
                </div>
                <div className='mb-1'>
                    <h2 className='mt-8 font-semibold text-lg'>{idea?.title.split(' ').slice(0,3).join(' ')}</h2>
                    <p>{idea?.title.split(' ').slice(3,10).join(' ')}</p>
                </div>
            </div>
        </li>
    );
}

export default PreviewIdea;
