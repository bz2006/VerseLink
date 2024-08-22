import React, { createContext, useState } from 'react';

const ConnectionContext = createContext();


const ConnectionProvider = ({ children }) => {

    const [connectionStatus, setconnectionStatus] = useState(false);
    const [connectionUrl, setconnectionUrl] = useState("");
    const [currentPresenting, setcurrentPresenting] = useState("");

    const Connect = (url) => {
        setconnectionStatus(true)
        setconnectionUrl(url)
    }

    const PresentingData = (value) => {
        setcurrentPresenting(value)
    }

    return (

        <ConnectionContext.Provider value={{
            Connect,
            connectionUrl,
            connectionStatus,
            currentPresenting, 
            PresentingData,
        }}>
            {children}
        </ConnectionContext.Provider>
    );
};

export { ConnectionContext, ConnectionProvider };
