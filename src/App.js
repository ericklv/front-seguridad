import React, { useState, useEffect } from 'react';
import {Button,Input} from 'antd';
import './App.css';

import { Layout, Menu } from 'antd';
import { UserOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const { TextArea } = Input;
const api = 'https://seguridad-spring-api.herokuapp.com/api/'


function App() {

  const [text, setText] = useState(null);
  const [key, setKey] = useState(null);
  const [alphabet,setAlphabet] = useState(null);
  const [cypher,setCypher] = useState(null);
  const [cypherText, setCypherText] = useState(null);

  useEffect(_ => {
    if(cypher!==null) encode()
  }, [cypher])

  const encode = () => {
    setCypherText("...call to API")
    const body= {alphabet, key,text}
    const headers= {
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }

    const requestOptions = {
      method: 'post',
      headers: headers,
      body: JSON.stringify(body)
    };

  
    fetch(api+'vigenere/'+cypher, requestOptions)
      .then(response => response.json())
      .then(data => {
        setCypherText(data.message)
        setCypher(null)
      });
  }

  return (
    <Layout>
    <Content style={{ padding: '0' }}>
      <Layout className="site-layout-background">
        <Sider className="site-layout-background" width={200}>
          <Menu
            title="Options"
            mode="inline"
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Crypto">
              <Menu.Item key="1">Caesar</Menu.Item>
              <Menu.Item key="2">Vigenere</Menu.Item>
              <Menu.Item key="3">Alberti</Menu.Item>
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

        <div className="App">
       <header className="App-header">
        <h1>Vigenere</h1>
        <h5>Default alphabet: abcdefghijklmnopqrstuvwxyz</h5>
        <h4 style={{color:'orange'}}>{cypherText}</h4>  
      </header>
      <div className='card-box'>
      <div className='input-box'>
      <p>Alphabet:</p>
      <TextArea placeholder="alphabet"
                onChange={({target})=>setAlphabet(target.value)} 
                cols="80" 
                rows="2">{alphabet}</TextArea>
      </div>
      <div className='input-box'>
      <p>Text to encrypt/decrypt:</p>
      <TextArea placeholder="text"
                onChange={({target})=>setText(target.value)}
                cols="80" 
                rows="4">{text}</TextArea>
      
        </div>
                
      <div className='input-box'>
      <p>Key text:</p>  
      <TextArea placeholder="key"
                onChange={({target})=>setKey(target.value)}
                cols="80" 
                rows="2">{key}</TextArea>
      </div>
      <div className="button-box">
      <Button type="default" onClick={()=>setCypher("encrypt")}>ENCODE</Button>
      <Button type="primary" onClick={()=>setCypher("decrypt")}>DECODE</Button>
      </div>
      <p> Erick LV</p>
      </div>
    </div>
        </Content>
      </Layout>
    </Content>
  </Layout>
  );
}

export default App;
