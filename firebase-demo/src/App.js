import React, { Component } from 'react';
import { Button, ButtonGroup, Badge } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Hello World
        </p>
        <ButtonGroup>
          <Button bsStyle="primary">Button 1</Button>
          <Button bsStyle="info">Button 2</Button>
          <Button bsStyle="success">Button 3</Button>
        </ButtonGroup>
        
      </div>
    );
  }
}

export default App;
