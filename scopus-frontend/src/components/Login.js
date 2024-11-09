import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', values);
            const { token } = response.data;
            message.success('Inicio de sesión exitoso');
            localStorage.setItem('token', token); // Guardar el token en localStorage
            setLoading(false);
            if (onLoginSuccess) onLoginSuccess(token); // Pasa el token a la función de éxito
        } catch (error) {
            message.error('Error al iniciar sesión. Verifica tus credenciales.');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <Form onFinish={handleLogin}>
        <Form.Item name="username" rules={[{ required: true, message: 'Ingrese su nombre de usuario' }]}>
          <Input placeholder="Nombre de usuario" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Ingrese su contraseña' }]}>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Iniciar Sesión</Button>
      </Form>
    </div>
  );
};

export default Login;