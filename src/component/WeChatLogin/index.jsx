import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Icon, DatePicker  } from 'antd';
const InputGroup = Input.Group;
import styles from './index.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    
  }
  
  render() {
    
    return (
      <div className={styles.wechatlogin}></div>
    );
  }
}
