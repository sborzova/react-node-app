import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Layout, Menu} from 'antd';
import 'antd/dist/antd.css';

const {Header, Content} = Layout;

class LayoutMenu extends Component {
    logout () {
        window.location.href =
            'http://localhost:8080/auth/realms/demo/protocol/openid-connect/logout?redirect_uri=http://localhost:3000';
    }

    render() {
         let href=window.location.href.split('/')[4];
         const selected = href !== '' ? href : 'dashboard';
        return (
            <div>
                <Layout className="layout">
                    <Header style={{ position: 'fixed', zIndex: 1000, width: '100%' }} mode="inline">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            onClick={this.handleClick}
                            selectedKeys={[selected]}
                            mode="horizontal"
                            style={{ lineHeight: '64px'}}
                        >
                            <Menu.Item key="dashboard">
                                <NavLink to="/">Dashboard</NavLink>
                            </Menu.Item>
                            <Menu.Item key="feedback">
                                <NavLink to="/feedback">Feedback</NavLink>
                            </Menu.Item>
                            <Menu.Item key="customers">
                                <NavLink to="/customers">Customers</NavLink>
                            </Menu.Item>
                            <Menu.Item key="licenses">
                                <NavLink to="/licenses">Licenses</NavLink>
                            </Menu.Item>
                            {/*<Menu.Item key="dev">*/}
                            {/*    <NavLink to="/dev">Dev</NavLink>*/}
                            {/*</Menu.Item>*/}

                            <Menu.Item style={{float: 'right'}} key="4">
                                <span onClick={() => this.logout()}>Logout</span>
                            </Menu.Item>
                            <Menu.Item style={{float: 'right'}} key="5">
                                <a target="_blank" rel="noopener noreferrer" href="http://localhost:8080/auth/realms/demo/account/">User</a>
                            </Menu.Item>

                        </Menu>
                    </Header>
                </Layout>
                <Content style={{ padding: '50px 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{ this.props.children }</div>
                </Content>
            </div>
        );
    }
}

export default LayoutMenu;