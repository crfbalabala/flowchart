import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Icon, DatePicker  } from 'antd';
const InputGroup = Input.Group;
import styles from './index.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: this.props.data.placeholder || '',
      type: this.props.data.type || 'text', 
      iconType: this.props.data.iconType || '',
      value:''
    };

    
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ 
      value: '' 
    });
  }
  onChangeUserName = (e) => {

    this.setState({ 
      value: e.target.value 
    });

    this.props.data.changePrice(e.target.value)

  }
  render() {
    const { value, type, iconType, placeholder } = this.state;
    const suffix = value ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      
      <InputGroup compact>

        <Input
          style={{ width: '60%' }}
          type={type}
          placeholder={placeholder}
          prefix={<Icon type={iconType} />}
          suffix={suffix}
          value={value}
          onChange={this.onChangeUserName}
          ref={node => this.userNameInput = node}
        />
        <div className={styles.codeImg}></div>
      </InputGroup>
    );
  }
}
