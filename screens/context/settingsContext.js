import React, { createContext, useState } from 'react';
import { Dimensions } from 'react-native';


const SettingsContext = createContext();
const { width, height } = Dimensions.get('window');
const w=width*0.05
const SettingsProvider = ({ children }) => {

  const [ColorTheme, setTheme] = useState('light');
  const[fontSize,setFontSize] = useState(w);

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
