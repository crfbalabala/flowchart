import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import styles from './index.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
    }
  }
  
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }

  render() {
    
    return (
      <div className={styles.leftBars}>
        <Menu mode="inline" openKeys={this.state.openKeys} selectedKeys={[this.state.current]} style={{ width: 180 }} onOpenChange={this.onOpenChange} onClick={this.handleClick} >
          <SubMenu key="sub1" title={<span><span>数据同步</span></span>}>
            <Menu.Item key="1">角色操作管理</Menu.Item>
            <Menu.Item key="2">用户同量同步</Menu.Item>
            <Menu.Item key="3">清理不同系统用户</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><span>职位城市管理</span></span>}>
            <Menu.Item key="5">城市管理</Menu.Item>
            <Menu.Item key="6">岗位管理</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">岗位操作</Menu.Item>
              <Menu.Item key="8">岗位设置</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><span>权限管理</span></span>}>
            <Menu.Item key="9">维度组管理</Menu.Item>
            <Menu.Item key="10">员工管理</Menu.Item>
            <Menu.Item key="11">登录用户</Menu.Item>
            <Menu.Item key="12">角色管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
