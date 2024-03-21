import React, {useEffect} from 'react';
import { createContext, useContext, useState } from 'react'

const HeaderContext = createContext();

export function useHeaderContext() {
    return useContext(HeaderContext);
}

export function HeaderContextProvider({ children }) {
    const [apiLoading, setApiLoading] = useState(false);
    return (
        <HeaderContext.Provider value={{apiLoading, setApiLoading }}>
            {children}
        </HeaderContext.Provider>
    );
}