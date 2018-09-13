import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PieChart from 'react-simple-pie-chart';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      votes: {
        votesForOne: 0,
        votesForTwo: 0,
        votesForThree: 0
      }
    };

    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    const votesRef = firebase.database().ref('votes');
    votesRef.on('value', (snapshot) => {
      const votes = snapshot.val();
      this.setState({
        votes: {
          votesForOne: votes.forOne.value,
          votesForTwo: votes.forTwo.value,
          votesForThree: votes.forThree.value
        }
      });
    });
  }

  handleVote(e) {
    const voteFor = e.target.id;
    const votesRef = firebase.database().ref('votes');
    let newTotal;
    if (voteFor === 'forOne') {
      newTotal = this.state.votes.votesForOne + 1;
    } else if (voteFor === 'forTwo') {
      newTotal = this.state.votes.votesForTwo + 1;
    } else {
      newTotal = this.state.votes.votesForThree + 1;
    }

    votesRef.child(voteFor).set({ value: newTotal });
  }

  handleReset() {
    const votesRef = firebase.database().ref('votes');
    votesRef.set({
      forOne: {
        value: 0
      },
      forTwo: {
        value: 0
      },
      forThree: {
        value: 0
      }
    });
  }

  render() {
    return (
      <div className="App">
        <PieChart 
          slices={[
            {
              color: '#f00',
              value: this.state.votes.votesForOne
            },
            {
              color: '#0f0',
              value: this.state.votes.votesForTwo
            },
            {
              color: '#00f',
              value: this.state.votes.votesForThree
            }
          ]}
        />
        <div>
          <h1>Number of votes for 1 {this.state.votes.votesForOne}</h1>
          <h1>Number of votes for 2 {this.state.votes.votesForTwo}</h1>
          <h1>Number of votes for 3 {this.state.votes.votesForThree}</h1>
        </div>
        <div className="buttons">
          <Button onClick={this.handleVote} id="forOne" bsStyle="primary">Vote for 1</Button>
          <Button onClick={this.handleVote} id="forTwo" bsStyle="success">Vote for 2</Button>
          <Button onClick={this.handleVote} id="forThree" bsStyle="info">Vote for 3</Button>
        </div>
        <Button onClick={this.handleReset} bsStyle="danger">Reset Votes</Button>
      </div>     
    );
  }
}

export default App;

