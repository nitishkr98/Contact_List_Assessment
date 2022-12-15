import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './containers/navbar';
import Router from './routes';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
