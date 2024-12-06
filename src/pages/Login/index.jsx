import React, { useState } from 'react'
import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

export default function Login() {
    const [phone, setPhone] = useState();
    const [code, setCode] = useState();

    let handleLogin = (val) => {
        console.log(val);
    };

    return (
        <div className='login'>
            <Card className='card'>
                <img className='logo' src={logo} alt="logo" />
                <Form
                    className='form'
                    validateTrigger="onBlur"
                    onFinish={handleLogin}
                >
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: "请输入正确的手机号格式"
                            }
                        ]}
                    >
                        <Input
                            className='phone'
                            placeholder='请输入手机号'
                            size='large'
                            value={phone}
                            onChange={(val) => setPhone(val.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Input
                            className='code'
                            placeholder='请输入验证码'
                            size='large'
                            value={code}
                            onChange={(val) => setCode(val.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button className='btn' type='primary' block size='large' htmlType='submit'>登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
