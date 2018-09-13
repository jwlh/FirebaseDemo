import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const newState = [];
      for (const item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
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
          {this.state.items.map((item) => {
            return (
              <li key={item.id}>
                <h3>{item.user}</h3>
              </li>
            );
          })}
        </ul>
      </div>     
    );
  }
}

export default App;

