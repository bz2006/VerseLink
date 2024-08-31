import React, { createContext, useState } from 'react';

const SettingsContext = createContext();


const SettingsProvider = ({ children }) => {

  const [ColorTheme, setTheme] = useState('light');
  const[fontSize,setFontSize] = useState();

  const toggleTheme = () => {
    setTheme(ColorTheme === 'light'? 'dark' : 'light');
  };
 

  return (

    <SettingsContext.Provider value={{
        ColorTheme,
        fontSize,
        setFontSize,
        toggleTheme
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
