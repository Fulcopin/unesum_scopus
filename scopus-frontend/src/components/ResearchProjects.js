// src/components/ResearchProjects.js

import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ResearchProjects = ({ onProjectAdded }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const onFinish = async (values) => {
        setLoading(true);
        const formData = new FormData();

        // Agrega los valores del formulario excepto el `score`
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('type', values.type);

        // Adjunta los archivos seleccionados
        fileList.forEach(file => {
            formData.append('images', file);
        });

        try {
            await axios.post('http://localhost:5000/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success('Proyecto agregado con éxito');
            form.resetFields();
            setFileList([]);
            if (onProjectAdded) onProjectAdded();
        } catch (error) {
            message.error('Error al agregar el proyecto');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList.map(file => file.originFileObj));
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Nombre del Proyecto" rules={[{ required: true, message: 'Por favor ingresa el nombre del proyecto' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Descripción" rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}>
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="type" label="Tipo de Investigación" rules={[{ required: true, message: 'Por favor selecciona el tipo de investigación' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Imágenes del Proyecto">
                <Upload
                    beforeUpload={() => false}
                    multiple
                    onChange={handleFileChange}
                >
                    <Button icon={<UploadOutlined />}>Seleccionar Imágenes</Button>
                </Upload>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Guardar Proyecto
            </Button>
        </Form>
    );
};

export default ResearchProjects;
