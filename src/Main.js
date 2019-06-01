import React from "react";
import {Layout, Menu} from 'antd'
import {Link, Route, Switch, Redirect} from "react-router-dom"
import EditableTable from './EditableTable';
// import './index.less'

const {Header, Content, Sider, Footer, SubMenu, Icon} = Layout;

const MyHeader = () => {
    return (
        <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="10">用户信息</Menu.Item>
                <Menu.Item key="20">nav 2</Menu.Item>
                <Menu.Item key="30">nav 3</Menu.Item>
            </Menu>
        </Header>
    );
}

const MyFooter = () => {
    return (
        <Footer className='main-footer'>
            销售宝 ©2019 袁氏物语有限公司
        </Footer>
    );
}

const Demo1 = () => {
    return (
        <div>
            <EditableTable />
        </div>
    );
}

const Demo2 = () => {
    return (
        <div>
            第二相差
        </div>
    );
}

const Demo3 = () => {
    return (
        <div>
            第三修改
        </div>
    );
}

const Demo4 = () => {
    return (
        <div>
            第四修改
        </div>
    );
}

const Demo5 = () => {
    return (
        <div>
            第五修改
        </div>
    );
}

const Demo6 = () => {
    return (
        <div>
            第六修改
        </div>
    );
}

const Demo7 = () => {
    return (
        <div>
            第七修改
        </div>
    );
}

const RightContent = () => {
    return (
        <div>
            <Content>
                <Switch>
                    <Route path="/1" component={Demo1}/>
                    <Route path="/2" component={Demo2}/>
                    <Route path="/3" component={Demo3}/>
                    <Route path="/4" component={Demo4}/>
                    <Route path="/5" component={Demo5}/>
                    <Route path="/6" component={Demo6}/>
                    <Route path="/7" component={Demo7}/>
                    <Redirect to="/1"/>
                </Switch>
            </Content>
        </div>
    );
}

const LeftSider = () => {
    return (
        <Sider>
            <Menu
                mode="inline"
                defaultSelectedKeys={['/1']}
            >
                <Menu.Item key="/1">
                    <Link to="/1"/>
                    用户列表
                </Menu.Item>
                <Menu.Item key="/2">
                    <Link to="/2"/>
                    option2
                </Menu.Item>
                <Menu.Item key="/3">
                    <Link to="/3"/>
                    option3
                </Menu.Item>
                <Menu.Item key="/4">
                    <Link to="/4"/>
                    44
                </Menu.Item>
                <Menu.Item key="/5">
                    <Link to="/5"/>
                    option2
                </Menu.Item>
                <Menu.Item key="/6">
                    <Link to="/6"/>
                    option3
                </Menu.Item>
                <Menu.Item key="/7">
                    <Link to="/7"/>
                    option3
                </Menu.Item>
            </Menu>
        </Sider>

    );
}

class Main extends React.Component {
    render() {
        return (
            <div className="Main">
                <Layout className='main-layout'>
                    <MyHeader/>
                    <Layout>
                        <LeftSider/>
                        <RightContent/>
                    </Layout>
                    <MyFooter/>
                </Layout>
            </div>
        );
    }
}


export default Main;