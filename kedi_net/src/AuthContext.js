import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const secretKey = localStorage.getItem('secret_key');
            if (secretKey) {
                try {
                    const response = await fetch(`http://localhost:8080/admin/details?secretKey=${secretKey}`);
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, []);

    const login = (secretKey) => {
        setUser({ secretKey });
        localStorage.setItem('secret_key', secretKey);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('secret_key');
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
