import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {api,scytaleRaw} from '../../urls';

const { TextArea } = Input;
const sourceLink = scytaleRaw;

const removeSpaces = text => (text||"").toString().replace(/ /g, '');
const generateOrder = (order,sides) => order? removeSpaces(order): Array.apply(null, new Array(sides)).map(i=> i )
const checkIsNumber = sides => (Number.isInteger(sides) && sides>0)? sides: 5;

export const Scytale = () => {

  const [text, setText] = useState(null);
  const [sides, setSides] = useState(5);
  const [order, setOrder] = useState("1,2,3,4,5");
  const [cypher, setCypher] = useState(null);
  const [cypherText, setCypherText] = useState(null);
  const [source, setSource] = useState('');

  useEffect(() => {
    fetch(sourceLink, { method: 'get' })
      .then(response => response.text())
      .then(data => setSource(data))
  }, []);

  useEffect(_ => {
    if (cypher !== null) encode()
  }, [cypher])

  const encode = () => {
    setCypherText("...call to API")
    const body = { sides, text, order }
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }

    const requestOptions = {
      method: 'post',
      headers: headers,
      body: JSON.stringify(body)
    };


    fetch(api + 'scytale/' + cypher, requestOptions)
      .then(response => response.json())
      .then(data => {
        setCypherText(data.message)
        setCypher(null)
      });
  }

  return (
    <div className="App">
      <div className="app-view">
        <header className="App-header">
        <h1>Scytale</h1>
        <h5>Default sides: 5 </h5>
        <h5>Default order: 1,2,3,4,5 </h5>
        <h4 style={{ color: 'orange' }}>{cypherText}</h4>
        </header>
        <div className='card-box'>
        <div className='input-box'>
          <p>Sides:</p>
          <TextArea placeholder="sides"
            value={sides}
            onChange={({ target }) => setSides(+target.value )}
            cols="80"
            rows="1"/>
        </div>
        <div className='input-box'>
          <p>Order:</p>
          <TextArea placeholder="order"
            value={order}
            onChange={({ target }) => setOrder(target.value)}
            cols="80"
            rows="1"/>
        </div>
        <div className='input-box'>
          <p>Text to encrypt/decrypt:</p>
          <TextArea placeholder="text"
            value={text}
            onChange={({ target }) => setText(target.value)}
            cols="80"
            rows="4"/>
        </div>

        <div className="button-box">
          <Button type="default" onClick={() => setCypher("encrypt")}>ENCODE</Button>
          <Button type="primary" onClick={() => setCypher("decrypt")}>DECODE</Button>
        </div>
        <p> Erick LV</p>
        </div>
      </div>
      <div className='code-view'>
        <SyntaxHighlighter language="java"
          style={dark}
          showLineNumbers={true}>            
          {source}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}