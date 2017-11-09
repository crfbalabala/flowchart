import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.scss'

import { Menu, Dropdown, Button, Icon, message } from 'antd';

export default class HeadNav extends Component {



    render() {

      const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
          </Menu.Item>
        </Menu>
      );

        return (
            <div className={styles.headnav}>
              <Link to='/'><span className={styles.headlogo}></span></Link> 
              <span className={styles.headtitle}>综合业务运营平台</span>
              <ul className={styles.headUl}>
                <li>
                  <Dropdown overlay={menu}>
                    <Button  className="ant-dropdown-link">
                      用户管理系统<Icon type="down" />
                    </Button>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown overlay={menu}>
                    <Button  className="ant-dropdown-link">
                      用户管理系统<Icon type="down" />
                    </Button >
                  </Dropdown>
                </li>
                <li>
                  <Dropdown overlay={menu}>
                    <Button  className="ant-dropdown-link">
                    用户管理系统<Icon type="down" />
                    </Button>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown overlay={menu}>
                    <Button  className="ant-dropdown-link">
                      用户管理系统<Icon type="down" />
                    </Button >
                  </Dropdown>
                </li>
                <li>
                  <Dropdown overlay={menu}>
                    <Button  className="ant-dropdown-link">
                      用户管理系统<Icon type="down" />
                    </Button>
                  </Dropdown>
                </li>
                
              </ul>
            </div>
        )
    }
}
