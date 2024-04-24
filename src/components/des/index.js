import {Button, Input} from 'antd';
import React, {useState, useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {api, desRaw} from './../../urls';

const {TextArea} = Input;

const sourceLink = desRaw;

export const DES = () => {

    const [text, setText] = useState(null);
    const [key, setKey] = useState(null);
    const [cypher, setCypher] = useState(null);
    const [cypherText, setCypherText] = useState(null);
    const [source, setSource] = useState('');

    useEffect(() => {
        fetch(sourceLink, {method: 'get'})
            .then(response => response.text())
            .then(data => setSource(data))
    }, []);

    useEffect(_ => {
        if (cypher !== null) encode()
    }, [cypher]) // eslint-disable-line react-hooks/exhaustive-deps

    const encode = () => {
        setCypherText("...call to API")
        const body = {key, text}
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


        fetch(api + 'des/' + cypher, requestOptions)
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
                    <h1>DES</h1>
                    <p style={{color: 'orange', wordBreak: 'break-all'}}>{cypherText}</p>
                </header>
                <div className='card-box'>
                    <div className='input-box'>
                        <p>Text to encrypt/decrypt:</p>
                        <TextArea placeholder="text"
                                  onChange={({target}) => setText(target.value)}
                                  cols="80"
                                  rows="4">{text}</TextArea>
                    </div>
                    <div className='input-box'>
                        <p>Key text:</p>
                        <TextArea placeholder="key"
                                  onChange={({target}) => setKey(target.value)}
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
