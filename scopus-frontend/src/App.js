// src/App.js

import React, { useState } from 'react';
import { message } from 'antd';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        message.success("Inicio de sesión exitoso.");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        message.info("Sesión cerrada.");
    };

    return (
        <div className="app-container">
            {isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
            ) : (
                <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
                    <Login onLoginSuccess={handleLoginSuccess} />
                </div>
            )}
        </div>
    );
};

export default App;
