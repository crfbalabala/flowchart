import React, { Component } from 'react';

import { HeadNav, InputDefault, InputPicCode, WeChatLogin, LeftBars } from '../../component'

import { Button } from 'antd';


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

  render() {

    this.checkIsLogin()

    return(
      <div>
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      </div>
    )
  }
}

