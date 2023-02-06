import React from 'react';
import IconArrow from '../icons/IconArrow';

const NotificationNewIdea = ({listIdeas, setShowNotification}) => {
    return (
        <>
            <div className='fixed w-screen bottom-0 left-0 flex justify-center'>
                <a className='bg-[#5CF2AC] animate-bounce text-[#0D0D0D] m-12 px-4 py-2 rounded-2xl hover:bg-[#6638A6] transition-colors duration-500 flex items-center' href={`#idea${listIdeas.length-1}`} onClick={()=>{
                    setShowNotification(false);

                }} >
                    ¡Tienes una nueva idea! <IconArrow className='ml-2 rotate-90 scale-75'></IconArrow>
                </a>
            </div>
        </>
    );
}

export default NotificationNewIdea;
