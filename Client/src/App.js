import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  fetch('http://10.0.75.1:443/config')
    .then(response => response.json())
    .then(json => {
      console.log('cuck', json);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Enigma</p>
      </header>
    </div>
  );
}

export default App;
