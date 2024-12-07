import React from 'react'
import './index.scss'
import { Layout, Menu } from 'antd'
import logo from '@/assets/logo.png'
import { LoginOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons'

export default function M_Layout() {
    const { Header, Sider, Content } = Layout;

    const items = [
        {
            label: '首页',
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: '文章管理',
            key: '/article',
            icon: <DiffOutlined />,
        },
        {
            label: '创建文章',
            key: '/publish',
            icon: <EditOutlined />,
        },
    ]


    return (
        <Layout className='layout'>
            <Header className='header'>
                <img className='logo' src={logo} alt="logo" />
                <div className="info">
                    <span className='username'>admin</span>
                    <span className='logout'>
                        <LoginOutlined />
                        退出
                    </span>
                </div>
            </Header>
            <Layout className='sec-layout'>
                <Sider className='sider'>
                    {/* <div className="demo-logo-vertical" /> */}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} items={items} />
                </Sider>
                <Content className='content'>Content</Content>
            </Layout>
        </Layout>
    )
}
