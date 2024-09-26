import React from 'react';
import { useNavigate } from 'react-router-dom';
import restaurant from '../../assets/restaurant.png';
import { Form, Input, Button, message } from 'antd';
import './Registration.css';
import EndPoints from '../../shared/DomainUrls';

const Registration = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const { username, email, password } = values;

        try {
            const response = await fetch(EndPoints.SignUp, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();

            if (data.success) {
                message.success('Registration successful!');
                form.resetFields();
                navigate('/login');
            } else {
                message.error(data.message || 'Registration failed');
            }

        } catch (error) {
            console.error(error);
            message.error(error.message || 'Something went wrong!');
        }
    };

    return (
        <div className='Signup-container'>
            <div className='signup-left-side'>
                <div className='left-side-content-container'>
                    <div className='site-info'>
                        <h2 className='title'>FeastFusion</h2>
                        <p className='description'>Rate and review your favorite Restaurants here</p>
                    </div>
                    <img className='logo-img' src={restaurant} alt='Logo Image' />
                    <div className='footer'>
                        <p className='footer-text'>© 2024 FeastFusion. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <div className='Signup-right-side'>
                <div className='right-side-content-container'>
                    <div className='signup-form'>
                        <Form
                            form={form}
                            name='basic'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={handleSubmit}
                            autoComplete='off'
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please enter your Email' }]}
                            >
                                <Input type='email' className='email-field' />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please enter your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Sign Up
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;