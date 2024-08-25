import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (provider: any) => void;
    logout: () => void;
    provider: any;
}

const defaultAuthContext: AuthContextType = {
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    provider: null,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);


// AuthProvider component to wrap the app
export const AuthProvider = ({ children }:any) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [provider, setProvider] = useState(null);

    const login = (web3authProvider:any) => {
        console.log(web3authProvider)
        setProvider(web3authProvider);
        if (web3authProvider?.connected) {
            setLoggedIn(true);
        }
    };

    const logout = () => {
        setLoggedIn(false);
        setProvider(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, provider }}>
            {children}
        </AuthContext.Provider>
    );
};