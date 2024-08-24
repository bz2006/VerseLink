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

    const Disconnect = () => {
        setconnectionStatus(false)
        setconnectionUrl("")
    }

    const PresentingData = (value) => {
        console.log(value)
        setcurrentPresenting(value)
    }

    return (

        <ConnectionContext.Provider value={{
            Connect,
            Disconnect,
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
