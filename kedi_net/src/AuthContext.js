import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (secretKey) => {
        setUser({ secretKey });
        localStorage.setItem('admin_secret_key', secretKey);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_secret_key');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
