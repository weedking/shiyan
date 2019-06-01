import React,{Component} from 'react';
import {Link, Route, Switch, Redirect,BrowserRouter} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Home from './Home'



class App extends React.Component {

    render(){
        return (
                <BrowserRouter>
                    <div className="App">
                        <Home/>
                    </div>
                </BrowserRouter>

        );

    }

}

export default App;
