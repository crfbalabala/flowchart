import React, { Component } from 'react';

import { HeadNav, InputDefault, InputPicCode, WeChatLogin, LeftBars } from '../component'

import { Button } from 'antd';

import { TesterView, TesterView2 } from './ChildrenView';
import { HashRouter, BrowserRouter, Link, Route, Redirect, Switch, withRouter, Prompt } from 'react-router-dom';


export default class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      price: 0
    }
  }

  checkIsLogin(){
    console.log("user's token has checked")
    if(CONFIGS.token != 'default'){
      this.props.history.push('/login')
    }
  }

  outputRender(tabType){
    switch (tabType) {
      case 'xxx':
        return (<TesterView/>);
        break;
    
      default:
        return (<TesterView2/>);
        break;
    }
  }

  render() {

    this.checkIsLogin()

    var tabType = this.props.match.params.tabIndex

    return(
      <div className="login-view">
        <HeadNav/>
        <LeftBars/>

        <div className='tab-container'>
          {this.outputRender(tabType)}
        </div>

        
      </div>
    )
  }
}

