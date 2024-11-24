import { useState } from 'react';
import { message } from 'antd';
import Dashboard from './components/Dashboard'; // Ensure the path is correct
import Login from './components/Login'; // Ensure the path is correct
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
