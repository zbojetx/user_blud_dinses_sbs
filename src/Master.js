import React, { useState, useEffect } from 'react';
import { Link, browserHistory, Redirect } from 'react-router';
import { Layout, Menu, Divider, Typography, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LaptopOutlined,
    HomeOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    PrinterOutlined,
    ShopTwoTone,
    AppstoreTwoTone,
    SnippetsTwoTone,
    DatabaseTwoTone,
    CrownTwoTone,
    DashboardTwoTone,
    LogoutOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Master.css';
import { useSelector, useDispatch } from 'react-redux';
import { isLogin } from './reducer/LocalStoradge'
import { createBrowserHistory } from "history"

//const history = createBrowserHistory()

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
const { Title } = Typography;

export default function Master(props) {
    const [collapsed, setCollapsed] = useState(false);
    const datasFromReducer = useSelector(state => state.savedDatas)
    const [datas, setDatas] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const dispatch = useDispatch();
    const [login, setLogin] = useState(true)
    const [tahun, setTahun] = useState('')

    useEffect(async () => {
        await isLoginFunc()
        // if(login === false){
        //    return  <Redirect to={'/'} />
        // }
    }, [])

    const isLoginFunc = async () => {
        const loginDatas = await isLogin()
        const year = await localStorage.getItem('tahun')
        console.log(loginDatas)
        if (loginDatas !== null) {
            setLogin(true)
            setDatas(loginDatas)
            setTahun(year)
            setDataUsers(loginDatas.data[0])
        } else {
            setLogin(false)
        }
        console.log(loginDatas)
    }

    const logout = async () => {
        localStorage.clear()
        setLogin(false)
        window.location.href = '/';
    }

    const toggle = () => {
        setCollapsed(!collapsed)
        console.log(dataUsers)
    }

    const toLogin = () => {
        window.location.href = '/';
    }

    if (login) {
        return (

            <Layout style={{ height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white' }}>
                    <div className="logo" style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}></div>
                    {dataUsers.akses === 'blud' && (
                        <Menu mode="inline" defaultSelectedKeys={['1']}>
                            {/* <Menu.Item key="1" onClick={() => browserHistory.push('/dashboard')} >
                                <DashboardTwoTone twoToneColor="#eb2f96" />
                                <span>Dashboard</span>
                            </Menu.Item> */}
                            <Menu.Item key="2" onClick={() => browserHistory.push(`${process.env.PUBLIC_URL}/blud`)}>
                                <ShopTwoTone twoToneColor="#05c46b" />
                                <span>Profil BLUD</span>
                            </Menu.Item>
                            <SubMenu key="anggaranmurni"
                                title={
                                    <span>
                                        <SnippetsTwoTone twoToneColor="#f0932b" />
                                        <span>Anggaran Murni</span>
                                    </span>
                                }>
                                <Menu.Item key="7" onClick={() => browserHistory.push(`${process.env.PUBLIC_URL}/inputmurni`)}>
                                    <span>Input</span>
                                </Menu.Item>
                                {/* <Menu.Item key="8">
                                    <span>Cetak</span>
                                </Menu.Item> */}
                            </SubMenu>
                            <SubMenu key="anggaranpergeseran"
                                title={
                                    <span>
                                        <SnippetsTwoTone twoToneColor="#f0932b" />
                                        <span>Anggaran Pergeseran</span>
                                    </span>
                                }>
                                {/* <Menu.Item key="7" onClick={() => browserHistory.push('/inputmurni')}>
                                    <span>Input</span>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <span>Cetak</span>
                                </Menu.Item> */}
                            </SubMenu>
                            <SubMenu key="anggaranperubahan"
                                title={
                                    <span>
                                        <SnippetsTwoTone twoToneColor="#f0932b" />
                                        <span>Anggaran Perubahan</span>
                                    </span>
                                }>
                                {/* <Menu.Item key="7" onClick={() => browserHistory.push('/inputmurni')}>
                                    <span>Input</span>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <span>Cetak</span>
                                </Menu.Item> */}
                            </SubMenu>
                        </Menu>
                    )}



                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })} */}
                        <div style={{ paddingRight: 20, float: 'left' }}>
                            <Button type="primary" >{tahun}</Button>
                        </div>
                        {dataUsers.akses === 'blud' &&
                            <div style={{ paddingRight: 20, float: 'right' }}>
                                <span style={{ fontWeight: 'bold', marginRight: 20 }}>{dataUsers.nama_blud}</span><Button type="danger" onClick={logout} icon={<LogoutOutlined />}></Button>
                            </div>
                        }
                          {dataUsers.akses === 'admin' &&
                            <div style={{ paddingRight: 20, float: 'right' }}>
                                <span style={{ fontWeight: 'bold', marginRight: 20 }}>{dataUsers.nama}</span><Button type="danger" onClick={logout} icon={<LogoutOutlined />}></Button>
                            </div>
                        }

                    </Header>
                    {props.children}
                </Layout>
            </Layout>
        )
    } else {
        return toLogin()
    }
}


