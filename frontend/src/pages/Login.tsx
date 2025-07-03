import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { GuestContinueButton } from '../components/GuestContinueButton';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';

const { Title, Text } = Typography;

type LoginFormInputs = {
    email: string;
    password: string;
};

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [serverError, setServerError] = React.useState('');

    const onSubmit = async (data: LoginFormInputs) => {
        setServerError('');
        try {
            await login(data.email, data.password);
            navigate('/home');
        } catch (err) {
            setServerError('Invalid email or password');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <Title level={3}>Login</Title>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                    label="Email"
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Email is required' }}
                        render={({ field }) => (
                            <Input {...field} type="email" placeholder="Enter your email" autoComplete="username" />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required' }}
                        render={({ field }) => (
                            <Input.Password {...field} placeholder="Enter your password" autoComplete="current-password" />
                        )}
                    />
                </Form.Item>

                {serverError && <Text type="danger">{serverError}</Text>}

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
            <Button onClick={() => navigate('/register')} color="default" block variant="filled">
                Don't have an accout? create one
            </Button>
            <GuestContinueButton />
        </div>
    );
};
