import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      votesForOne: 0,
      votesForTwo: 0,
      votesForThree: 0
    };

    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    const votesRef = firebase.database().ref('votes');
    votesRef.on('value', (snapshot) => {
      const votes = snapshot.val();
      this.setState({
        votesForOne: votes.forOne.value,
        votesForTwo: votes.forTwo.value,
        votesForThree: votes.forThree.value
      });
    });
  }

  handleVote(e) {
    const voteFor = e.target.id;
    const votesRef = firebase.database().ref('votes');
    let newTotal;
    if (voteFor === 'forOne') {
      newTotal = this.state.votesForOne + 1;
    } else if (voteFor === 'forTwo') {
      newTotal = this.state.votesForTwo + 1;
    } else {
      newTotal = this.state.votesForThree + 1;
    }

    votesRef.child(voteFor).set({ value: newTotal });
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Number of votes for 1 {this.state.votesForOne}</h1>
          <h1>Number of votes for 2 {this.state.votesForTwo}</h1>
          <h1>Number of votes for 3 {this.state.votesForThree}</h1>
        </div>
        <div className="buttons">
          <Button onClick={this.handleVote} id="forOne" bsStyle="primary">Vote for 1</Button>
          <Button onClick={this.handleVote} id="forTwo" bsStyle="success">Vote for 2</Button>
          <Button onClick={this.handleVote} id="forThree" bsStyle="info">Vote for 3</Button>
        </div>
      </div>     
    );
  }
}

export default App;

