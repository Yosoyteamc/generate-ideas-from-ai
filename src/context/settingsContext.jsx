import { createContext, useState } from 'react';

const defaultSettings = {
    settings: {
        profile: 'default',
        preferences: ['default']
    }
}

export const SettingsContext = createContext();

export const SettingsContextProvider = ({children}) =>{

    const [settings, setSettings] = useState(defaultSettings);

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}
