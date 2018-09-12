import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      user: this.state.username
    };
    itemsRef.push(item);
    this.setState({
      username: ''
    });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="type your name" onChange={this.handleChange} value={this.state.username}/>
          <button>Add your name</button>
        </form>
        <ul>

        </ul>
      </div>     
    );
  }
}

export default App;

