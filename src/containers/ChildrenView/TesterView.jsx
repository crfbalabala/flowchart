import React, { Component } from 'react';

import { HeadNav, InputDefault, InputPicCode, WeChatLogin, LeftBars } from '../../component'

import { Button } from 'antd';

import Iframe from 'react-iframe'

export default class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      price: 0
    }
  }

  checkIsLogin(){
    if(CONFIGS.token != 'default'){
      this.props.history.push('/login')
    }
  }

  componentDidMount() {

    console.log('-------------------------------------------------')

  }

  render() {

    this.checkIsLogin()

    return(
      <Iframe url="../static/index.html"
        width="100%"
        height="100%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
    )
  }
}

