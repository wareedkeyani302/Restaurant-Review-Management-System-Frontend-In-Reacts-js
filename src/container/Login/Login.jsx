import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import restaurant from '../../assets/restaurant.png';

const Login = () => {
    const navigate = useNavigate('');
    const handleSubmit = async (values) => {
        const { email, password } = values;

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            // Assuming the response contains a token and user information
            const {user } = data;

            localStorage.setItem('user', JSON.stringify(user));
            message.success('Login successful!');
            navigate('/restaurants');
        } catch (error) {
            console.error('Error:', error);
            message.error('Login failed! Please check your credentials.');
        }
    };

    return (
        <div className='container'>
            <div className='login-left-side'>
                <div className='left-side-content-container'>
                    <div className='site-info'>
                        <h2 className='title'>Restaurant Management System</h2>
                        <p className='description'>Rate and review your favorite Restaurants here</p>
                    </div>
                    <img className='logo-img' src={restaurant} alt='Logo Image' />
                    <div className='footer'>
                        <p className='footer-text'>© 2024 Restaurant Management System. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <div className='login-right-side'>
                <div className='right-side-content-container'>
                    <div className='login-form'>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleSubmit} 
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your valid Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
