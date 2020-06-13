import {Button,Input} from 'antd';
import React,{ useState, useEffect } from 'react';
const { TextArea } = Input;

const api = 'https://seguridad-spring-api.herokuapp.com/api/'

export const Vigenere = () => {

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
    );
}