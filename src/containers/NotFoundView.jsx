import React, { Component } from 'react';

import { HeadNav, InputDefault, InputPicCode, WeChatLogin, LeftBars } from '../component'

import { Button } from 'antd';


export default class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      errorState: 404
    }
  }

  render() {

    return(
      <div className="login-view">
        <HeadNav/>
        <div className='tab-container-error-noleft'>
          <div className='error-info'>{this.state.errorState}</div>
        </div>
      </div>
    )
  }
}

