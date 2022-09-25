import React, {useState, useEffect} from 'react'
import {Row, Col, Menu, Icon, Dropdown, Space} from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

import { AiFillHome, AiFillYoutube, AiFillBulb, AiFillSmile } from "react-icons/ai";
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header=()=> {

    // 获取文章类别信息，数组解构声明
    const [navArray, setNavArray] = useState([]);
    useEffect(()=>{
        // 方法变量，方法里面是异步
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data;
                }
            )
            setNavArray(result);
        }
        fetchData();  // 调用函数
    },[]);

    // 点击跳转，e是按钮的key值
    const handleClick = (e) => {
        console.log('e.key = '+e.key);
        if(e.key == 0) {
            Router.push('/');  // 跳转到首页
        } else {
            Router.push('/list?id='+e.key);  // 跳转到 视频教程/大胖BBD/快乐生活
        }
    }

    // 展示给用户的html
    return (
        <div className='header'>
            <Row tye='flex' justify='center'>
                <Col cs={12} sm={12} md={12} lg={12} xl={14} >
                    <span className='header-logo'>Login</span>
                    <span className='header-text'>University of XX</span>
                </Col>
                <Col cs={12} sm={12} md={12} lg={12} xl={10}>
                    <Menu mode='horizontal' onClick={handleClick}>
                        <Menu.Item key='0'><AiFillHome/>Main Page</Menu.Item>
                        <Menu.Item key='1'><AiFillYoutube/>Academia</Menu.Item>
                        <Menu.Item key='2'><AiFillBulb/>Clubs</Menu.Item>
                        <Menu.Item key='3'><AiFillSmile/>Market</Menu.Item>
                        {/* {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>{item.typeName}</Menu.Item>
                                )
                            })
                        } */}
                    </Menu>    
                </Col>
            </Row>
        </div>
    )
}

const menu = (
    <Menu
      items={[
        { key: '1', label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              USC
            </a>
          ),
        },
        { key: '2', label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              DukeU
            </a>
          ),
        },
        { key: '3', label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              GeorgiaTech
            </a>
          ),
        },
        { key: '4', label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              UCLA
            </a>
          ),
        },
        { key: '5', label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              UCI
            </a>
          ),
        },
      ]}
    />
  );
  
  const App = () => (
    <Dropdown overlay={menu}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );

export default Header