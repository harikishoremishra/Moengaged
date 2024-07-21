import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            axios.get('/api/users/me')
                .then(res => setUser(res.data))
                .catch(err => {
                    setToken(null);
                    setUser(null);
                });
        }
    }, [token]);

    const login = async (username, password) => {
        const res = await axios.post('/api/users/login', { username, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };

    const signup = async (username, password) => {
        const res = await axios.post('/api/users/signup', { username, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
