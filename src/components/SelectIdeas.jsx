import React, { useContext, useEffect, useRef, useState } from 'react';
import { createOneSuggestion, createSuggestions } from '../service/CohereIA';
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/settingsContext';
import PreviewIdea from './pure/PreviewIdea';
import SearchIdea from './pure/SearchIdea';
import NotificationNewIdea from './pure/NotificationNewIdea';
import IdeasCount from './pure/IdeasCount';
import WelcomeMessage from './pure/WelcomeMessage';
import { listDefault } from '../constants/dataPerDefault';


const SelectIdeas = () => {

    const [loading, setLoading] = useState(true);
    const [loadingOneIdea, setLoadingOneIdea] = useState(false);
    const [closeMessage, setCloseMessage] = useState(false);
    const [listIdeas, setListIdeas] = useState(listDefault);
    const { settings, setSettings } = useContext(SettingsContext);
    const [showNotification, setShowNotification] = useState(false);
    const welcomeMessage = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        obtainData();
    }, []);

    useEffect(() => {
        !loading && setTimeout(() => {
            setCloseMessage(true);
        }, 3000);
    }, [loading]);

    const navigateTo = (id) => {
        navigate('/main/idea/' + id, { state: id});
    }

    const obtainData = async () => {
        try {
            const response = JSON.parse(localStorage.getItem('data')) || await createSuggestions(settings);
            setListIdeas(response?.userList || response);
            response && setLoading(false);
            saveData(response?.userList || response, response?.settings || settings);
            setSettings(response?.settings);
        } catch (error) {
            console.log(error);
        }
    }

    const saveData = (list, userSettings) => {
        localStorage.setItem('data', JSON.stringify({
            userList: list,
            settings: userSettings
        }));
    }

    const getUserSettings = () => {
        const userSettings = JSON.parse(localStorage.getItem('data'))?.settings;
        userSettings && setSettings(userSettings);
    }

    const obtainNewElement = async () => {
        try {
            setLoadingOneIdea(true);
            getUserSettings();
            const response = await createOneSuggestion( listIdeas.length+1, settings);
            const newList = [...listIdeas, response];
            setListIdeas(newList);
            saveData(newList, settings);
            setShowNotification(true);
            setLoadingOneIdea(false);
        } catch (error) {
            console.log(error);
            setLoadingOneIdea(false);
        }
    }

    return (
        <div className={`w-screen p-5 relative max-w-[1200px] flex flex-col items-center`}>
            <SearchIdea listIdeas={listIdeas}></SearchIdea>
            <WelcomeMessage closeMessage={closeMessage} welcomeMessage={welcomeMessage} loading={loading}></WelcomeMessage>
            { !loading && closeMessage && <IdeasCount listIdeas={listIdeas} loadingOneIdea={loadingOneIdea} obtainNewElement={obtainNewElement}></IdeasCount> }
            <ul className={`flex flex-col md:flex-wrap md:flex-row items-center justify-center md:justify-items-center last:mb-14 ${loading? 'animate-pulse pointer-events-none': ''} `}>
                {   listIdeas.map((item, index) => ( <PreviewIdea key={index} index={index} idea={item} loading={loading} navigate={navigateTo}></PreviewIdea>)) }
            </ul>
            { showNotification && <NotificationNewIdea listIdeas={listIdeas} setShowNotification={setShowNotification}></NotificationNewIdea> }
        </div>
    );
}

export default SelectIdeas;
