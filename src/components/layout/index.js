import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


export const BaseLayout = (props) => {
  const [path, setPath] = useState(window.location.pathname);

  const history = useHistory();

  useEffect(_ =>{
    if(window.location) setPath(window.location.pathname)
  },[window.location])

  return <Layout>
    <Content style={{ padding: '0' }}>
      <Layout className="site-layout-background">
        <Sider className="site-layout-background" width={200}>
          <Menu
            title="Options"
            mode="inline"
            defaultSelectedKeys={[path]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined/>} title="Crypto">
              <Menu.Item key="/caesar" onClick={_ => history.push('/caesar')}>Caesar</Menu.Item>
              <Menu.Item key="/vigenere" onClick={_ => history.push('/vigenere')}>Vigenere</Menu.Item>
              <Menu.Item key="/escitala" onClick={_ => history.push('/escitala')}>Scytale</Menu.Item>
              <Menu.Item key="/rc4" onClick={_ => history.push('/rc4')}>RC4</Menu.Item>
              <Menu.Item key="/des" onClick={_ => history.push('/des')}>DES</Menu.Item>
              {/*<Menu.Item key="/vernam" onClick={_ => history.push('/vernam')}>Vernam</Menu.Item>*/}
            </SubMenu>
            {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu> */}
          </Menu>
        </Sider>
        <Content style={{ padding: '20px 24px', minHeight: 280 }}>
          {props.children}
        </Content>
      </Layout>
    </Content>
  </Layout>
}