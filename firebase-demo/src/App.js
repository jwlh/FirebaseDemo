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
        burgers: 0,
        pizza: 0,
        ramen: 0
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
          burgers: votes.burgers.numberOfVotes,
          pizza: votes.pizza.numberOfVotes,
          ramen: votes.ramen.numberOfVotes
        }
      });
    });
  }

  handleVote(e) {
    const voteFor = e.target.id;
    const votesRef = firebase.database().ref('votes');
    let newTotal;
    if (voteFor === 'burgers') {
      newTotal = this.state.votes.burgers + 1;
    } else if (voteFor === 'pizza') {
      newTotal = this.state.votes.pizza + 1;
    } else {
      newTotal = this.state.votes.ramen + 1;
    }

    votesRef.child(voteFor).set({ numberOfVotes: newTotal });
  }

  handleReset() {
    const votesRef = firebase.database().ref('votes');
    votesRef.set({
      burgers: {
        numberOfVotes: 0
      },
      pizza: {
        numberOfVotes: 0
      },
      ramen: {
        numberOfVotes: 0
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
              value: this.state.votes.burgers
            },
            {
              color: '#0f0',
              value: this.state.votes.pizza
            },
            {
              color: '#00f',
              value: this.state.votes.ramen
            }
          ]}
        />
        <div>
          <h1>Burgers {this.state.votes.burgers}</h1>
          <h1>Pizza {this.state.votes.pizza}</h1>
          <h1>Ramen {this.state.votes.ramen}</h1>
        </div>
        <div className="buttons">
          <Button onClick={this.handleVote} id="burgers" bsStyle="primary">Burgers</Button>
          <Button onClick={this.handleVote} id="pizza" bsStyle="success">Pizza</Button>
          <Button onClick={this.handleVote} id="ramen" bsStyle="info">Ramen</Button>
        </div>
        <Button onClick={this.handleReset} bsStyle="danger">Reset Votes</Button>
      </div>     
    );
  }
}

export default App;

