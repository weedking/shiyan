import React from 'react';
import {Link, Route, Switch, Redirect,BrowserRouter} from "react-router-dom";

import {Layout, Menu} from 'antd';
import Main from './Main'

const { Header, Content, Sider, Footer } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props)
        // 没有super(props), 后面使用回报错
        // 定义state
        // bind方法
        // 其他初始化工作
    }

    componentWillMount() {
        // 服务器渲染的唯一hook
    }

    componentDidMount() {
        // 可以调用setState， render Component
    }

    render() {
        return (
            <div className="Home">
                <Switch>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/"} component={Main}/>
                    <Redirect to={"/"}/>
                </Switch>
            </div>
        );
    }
}

const Login = () => {
    return(
        <div>login</div>
    );
}


export default Home
