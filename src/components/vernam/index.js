import {Button, Input} from 'antd';
import React, {useState, useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {api, vigenereRaw} from './../../urls';

const {TextArea} = Input;

const sourceLink = vigenereRaw;

export const Vernam = () => {

    const [text, setText] = useState(null);
    const [key, setKey] = useState(null);
    const [alphabet, setAlphabet] = useState(null);
    const [cypher, setCypher] = useState(null);
    const [cypherText, setCypherText] = useState(null);
    const [decryptText, setDecryptText] = useState(null);
    const [source, setSource] = useState('');

    useEffect(() => {
        fetch(sourceLink, {method: 'get'})
            .then(response => response.text())
            .then(data => setSource(data))
    }, []);

    useEffect(_ => {
        if (cypher !== null) encode()
    }, [cypher])

    const encode = () => {
        setCypherText("...call to API")
        const body = {alphabet, key, text}
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

    const isBlank = str => (!str || /^\s*$/.test(str));

    const encrypt = (plaintext, key_) => {
        let key = '', ciphertext = '', len = plaintext.length

        if (isBlank(key_)) {
            for (let i = 0; i < len; i++) {
                // genera un numero random del 0-9
                key += ~~((Math.random() * 10) - 1)
                // encripta usando el caracter generado
                ciphertext += xor(plaintext.charCodeAt(i), key[i])
            }
        } else {
            let aux = 0;
            key = key_;

            for (let i = 0; i < len; i++) {
                let p = plaintext.charCodeAt(i);
                let k = ~~key.charCodeAt(aux);
                console.log(p, k, String.fromCharCode(p, k));
                ciphertext += xor(p, k);
                (aux + 1 >= key.length) ? aux = 0 : aux++;
            }

        }
        setKey(key)
        setCypherText(ciphertext)
    }

    const decrypt = (key, ciphertext) => {
        var plaintext = ''
            , key = key.split('')
            , len = ciphertext.length
        let aux = 0;
        for (var i = 0; i < len; i++) {
            plaintext += xor(ciphertext.charCodeAt(i), key[aux])
            (aux + 1 >= key.length) ? aux = 0 : aux++;
        }

        setDecryptText(plaintext)
    }

    const xor = (char, key) => String.fromCharCode(char ^ key)

    return (
        <div className="App">
            <div className="app-view">
                <header className="App-header">
                    <h1>Vernam</h1>
                    <h4 style={{color: 'orange'}}>CypherText: {cypherText}</h4>
                    <h4 style={{color: 'orange'}}>Key: {key}</h4>
                    <h4 style={{color: 'orange'}}>DecryptText: {decryptText}</h4>
                </header>
                <div className='card-box'>
                    <div className='input-box'>
                        <p>Key text:</p>
                        <TextArea placeholder="key"
                                  onChange={({target}) => setKey(target.value)}
                                  cols="80"
                                  rows="2">{key}</TextArea>
                    </div>
                    <div className='input-box'>
                        <p>Text to encrypt/decrypt:</p>
                        <TextArea placeholder="text"
                                  onChange={({target}) => setText(target.value)}
                                  cols="80"
                                  rows="4">{text}</TextArea>
                    </div>
                    <div className='button-box'>
                        <Button type='default' onClick={() => encrypt(text, key)}>ENCODE</Button>
                        <Button type='primary' onClick={() => decrypt(key, cypherText)}>DECODE</Button>
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