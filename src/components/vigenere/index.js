import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { TextArea } = Input;

const api = 'https://seguridad-spring-api.herokuapp.com/api/'
const sourceLink = 'https://raw.githubusercontent.com/ericklv/api-seguridad/master/src/main/java/com/caesar/demo/service/Vigenere.java'

export const Vigenere = () => {

  const [text, setText] = useState(null);
  const [key, setKey] = useState(null);
  const [alphabet, setAlphabet] = useState(null);
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
    const body = { alphabet, key, text }
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


    fetch(api + 'vigenere/' + cypher, requestOptions)
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
          <h1>Vigenere</h1>
          <h5>Default alphabet: abcdefghijklmnopqrstuvwxyz</h5>
          <h4 style={{ color: 'orange' }}>{cypherText}</h4>
        </header>
        <div className='card-box'>
          <div className='input-box'>
            <p>Alphabet:</p>
            <TextArea placeholder="alphabet"
              onChange={({ target }) => setAlphabet(target.value)}
              cols="80"
              rows="2">{alphabet}</TextArea>
          </div>
          <div className='input-box'>
            <p>Text to encrypt/decrypt:</p>
            <TextArea placeholder="text"
              onChange={({ target }) => setText(target.value)}
              cols="80"
              rows="4">{text}</TextArea>
          </div>
          <div className='input-box'>
            <p>Key text:</p>
            <TextArea placeholder="key"
              onChange={({ target }) => setKey(target.value)}
              cols="80"
              rows="2">{key}</TextArea>
          </div>
          <div className='button-box'>
            <Button type='default' onClick={() => setCypher("encrypt")}>ENCODE</Button>
            <Button type='primary' onClick={() => setCypher("decrypt")}>DECODE</Button>
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