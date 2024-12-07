import React, { useEffect } from 'react'
import './index.scss'
import { Layout, Menu, Popconfirm } from 'antd'
import logo from '@/assets/logo.png'
import { LoginOutlined, HomeOutlined, DiffOutlined, EditOutlined } from '@ant-design/icons'
import { Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, getUserInfo } from '@/store/modules/user'

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
    const location = useLocation();
    const selectedKey = location.pathname;
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [])

    const logout = () => {
        dispatch(clearUserInfo());
        navi('/login');
    };

    return (
        <Layout className='layout'>
            <Header className='header'>
                <img className='logo' src={logo} alt="logo" />
                <div className="info">
                    <span className='username'>{userInfo.name}</span>
                    <Popconfirm
                        title='是否确认退出?'
                        okText="确认"
                        cancelText="取消"
                        onConfirm={logout}
                    >
                        <span className='logout'>
                            <LoginOutlined />
                            退出
                        </span>
                    </Popconfirm>
                </div>
            </Header>
            <Layout className='sec-layout'>
                <Sider className='sider'>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[selectedKey]}
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
