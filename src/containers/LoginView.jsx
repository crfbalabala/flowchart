import React, { Component } from 'react';

import { HeadNav, InputDefault, InputPicCode, WeChatLogin } from '../component'

import { Button } from 'antd';



export default class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: 'admin',
      pawssword: 'admin',
      code: ''
    }
  }

  changePrice(key, data){
    this.setState({
      [key]: data
    })
  }

  async handleMenuClick(e) {

    let path = `${CONFIGS.host}/user/v1/login `;

    try{
      let result = await CRFFETCH.Post(path, this.state, {}, 1000);
      console.log(result)
    }catch(e){
      console.log(e)
      this.props.history.push('/')
    }
    

  }

  render() {

    //  changePrice这个方法是要传到子组件里去的
    let data1 = {
      placeholder: "请输入用户名",
      changePrice: this.changePrice.bind(this, 'username'),
      iconType: 'user'
    }
    let data2 = {
      placeholder: "请输入密码",
      type:'password',
      changePrice: this.changePrice.bind(this, 'pawssword'),
      iconType: 'lock'
    }
    let data3 = {
      placeholder: "请输入验证码",
      changePrice: this.changePrice.bind(this, 'code'),
      iconType: 'picture'
    }
    return(
      <div className="login-view">
        <HeadNav/>
        <div className='login-wrap'>
          
          <div className='login-container'>
              <div className='login-tips'>账号登录</div>
              <InputDefault data={data1}/>
              <InputDefault data={data2}/>
              <InputPicCode data={data3}/>
              <Button type="primary" className="login-button" onClick={this.handleMenuClick.bind(this)}>登录</Button>
              <div className='login-tips'>其他方式登录</div>
              <WeChatLogin/>
          </div>
        </div>
        
      </div>
    )
  }
}

