import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <h2>Vigenere</h2>
        <h6>Default alphabet: abcdefghijklmnopqrstuvwxyz</h6>

        <p style={{color:'yellow'}}>{cypherText}</p>
      
        <p>Alphabet:</p>
        <textarea placeholder="alphabet"
                  onChange={({target})=>setAlphabet(target.value)} 
                  cols="80" 
                  rows="2">{alphabet}</textarea>
        <p>Text to encrypt/decrypt:</p>
        <textarea placeholder="text"
                  onChange={({target})=>setText(target.value)}
                  cols="80" 
                  rows="4">{text}</textarea>
        <p>Key text:</p>          
        <textarea placeholder="key"
                  onChange={({target})=>setKey(target.value)}
                  cols="80" 
                  rows="2">{key}</textarea>
        <div>
        <button onClick={()=>setCypher("encrypt")}>ENCODE</button>
        <button onClick={()=>setCypher("decrypt")}>DECODE</button>
        </div>
        <br/>
        <p> Erick LV</p>
      </header>
    </div>
  );
}

export default App;
