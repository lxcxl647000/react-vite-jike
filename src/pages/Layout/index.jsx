import React from 'react'
import './index.scss'
import { Layout, Menu } from 'antd'
import logo from '@/assets/logo.png'
import { LoginOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function M_Layout() {
    const { Header, Sider, Content } = Layout;
    const items = [
        {
            label: '首页',
            key: '/home',
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
    ];
    const navi = useNavigate();


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
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/home']}
                        items={items}
                        onSelect={({ key }) => navi(key)}
                    />
                </Sider>
                <Content className='content'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
