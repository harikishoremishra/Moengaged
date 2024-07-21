import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'; // Ensure this path is correct
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Search from './Pages/Search';
import Lists from './Pages/Lists';

const App = () => (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search" element={<Search />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    </AuthProvider>
);

export default App;
