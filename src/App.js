import React from 'react';
import {Routes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import { Fragment } from 'react';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
    </>
  );
}

export default App;
