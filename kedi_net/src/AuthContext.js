import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchDetails = async (key, setter, url) => {
            const secretKey = localStorage.getItem(key);
            if (secretKey) {
                try {
                    const response = await fetch(`${url}?secretKey=${secretKey}`);
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setter(data);
                } catch (error) {
                    console.error(`Error fetching ${key} details:`, error);
                }
            }
        };

        fetchDetails('user_secret_key', setUser, 'http://localhost:8080/user/details');
        fetchDetails('admin_secret_key', setAdmin, 'http://localhost:8080/admin/details');
    }, []);

    const login = (secretKey, role) => {
        if (role === 'admin') {
            setAdmin({ secretKey });
            localStorage.setItem('admin_secret_key', secretKey);
        } else {
            setUser({ secretKey });
            localStorage.setItem('user_secret_key', secretKey);
        }
    };

    const logout = () => {
        setUser(null);
        setAdmin(null);
        localStorage.removeItem('user_secret_key');
        localStorage.removeItem('admin_secret_key');
    };

    const isLoggedIn = () => {
        return user !== null || admin !== null;
    };

    return (
        <AuthContext.Provider value={{ user, admin, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
