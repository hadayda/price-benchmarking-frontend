import {createContext, useState, useEffect} from 'react';
import loginUser from "./services/authServices";
import {message} from "antd";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const {token} = await loginUser(email, password);
            localStorage.setItem('token', token);
            setIsAuthenticated(true)
        } catch (error) {
            message.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('token');
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
        }
        setLoading(false)
    }, []);
    return <AuthContext.Provider value={{isAuthenticated, login, logout}}>
        {!loading && children}
    </AuthContext.Provider>
}