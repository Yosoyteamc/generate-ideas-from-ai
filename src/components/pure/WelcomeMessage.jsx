import React, { useRef } from 'react';
import IconCreate from '../icons/IconCreate';

const WelcomeMessage = ({setCloseMessage, closeMessage, loading}) => {

    const welcomeMessage = useRef();

    const closedWhitAnimation = () => {
        setTimeout(() => {
            welcomeMessage.current.style.display = 'none';
        }, 200);
        return  'slide-out-top'
    }

    return (
        <>
         <div ref={welcomeMessage} className={`mb-2 w-[330px] z-0 relative ${closeMessage? closedWhitAnimation():'' }`}>
                <div className='flex relative'>
                    <div className='bg-[#5CF2AC] w-[80%] rounded-t-[2.8rem] h-[55px]'></div>
                    <button className='absolute right-[-5px] top-0 border-[10px] border-white text-[#0D0D0D] w-min-[20%] rounded-bl-[1rem] ' onClick={()=>{setCloseMessage(!closeMessage)}}><div className='py-[.8rem] shadow px-[1.2rem] rounded-2xl  bg-[#5CF2AC] hover:bg-[#6638A6] transition-colors duration-500'><IconCreate className='-rotate-45 ml-1 scale-110'></IconCreate></div></button>
                </div>
                <div className='bg-[#5CF2AC]  shadow py-3 rounded-b-[3rem] mt-[-1px] rounded-tr-3xl'>
                    <h2 className={`px-8 mt-2 pb-2 font-semibold text-3xl`}>Bienvenido</h2>
                    <p className={`px-8 pb-6 text-[#0D0D0D] `}>
                        Hola  ¿Qué tal? { loading? 'Estamos generando ': 'Generamos '} algunas ideas para que puedas empezar a crear contenido. No queremos  quitarte parte del proceso creativo, pero si darte un poco de ayuda.
                        Desde ahora podrás guardar las ideas que te parezcan más interesantes, editarlas, eliminarlas o generar más. <br/><br/>{ loading? 'Estamos procesando tu solicitud, en breve lloveran las ideas...': '¡Vamos!'}
                    </p>
                </div>
            </div>   
        </>
    );
}

export default WelcomeMessage;
