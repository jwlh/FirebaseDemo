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
    // here we connect with out firebase to retrieve our data
    // firebase offers us an easy way to not only get the data from the db but also 
    // to update it when ever new values get added using the value custom event listener
    // this fires on two occassions 
    // 1. any time a new item is added or removed or changed within the votes area of our db
    // 2. the first time the event listener is attached
    // No.2 is especially usefull for initially grabbing a list of all the items inside our db, hence why it is in componentDidMount
    const votesRef = firebase.database().ref('votes');
    votesRef.on('value', (snapshot) => {
      // the snapshot callback here provides us with an overview of of the votesRef and we can then use .val() to grab a list of all the properties
      const votes = snapshot.val();
      this.setState({
        votes: {
          //then we assign each of the values in the db to our local state to use everywhere in our app
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
    // here we use .child() with the same name as the item we are voting 
    //for and .set() to replace the number of votes with our new total
    votesRef.child(voteFor).set({ numberOfVotes: newTotal });
  }

  handleReset() {
    // in this case we are simply using .set() to reset the whole votes section of the db so that each item now has 0 votes.
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
        <h1>Vote For Your Favourite Food</h1>
        <div className="chartContainer">
          <PieChart
            slices={[
              {
                color: '#337ab7',
                value: this.state.votes.burgers
              },
              {
                color: '#5bb85b',
                value: this.state.votes.pizza
              },
              {
                color: '#f0ad4e',
                value: this.state.votes.ramen
              }
            ]}
          />
        </div>
        <div className="buttons">
          <Button onClick={this.handleVote} id="burgers" bsStyle="primary">Burgers</Button>
          <Button onClick={this.handleVote} id="pizza" bsStyle="success">Pizza</Button>
          <Button onClick={this.handleVote} id="ramen" bsStyle="warning">Ramen</Button>
        </div>
        <Button onClick={this.handleReset} bsStyle="danger">Reset Votes</Button>
        <h2>Total Votes</h2>
        <h3>Burgers {this.state.votes.burgers}</h3>
        <h3>Pizza {this.state.votes.pizza}</h3>
        <h3>Ramen {this.state.votes.ramen}</h3>
      </div>     
    );
  }
}

export default App;

