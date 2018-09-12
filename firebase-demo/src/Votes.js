import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

const Votes = ({ votes }) => {
  const voteList = votes;

  return (
    <div>
      {voteList}
    </div>
  );
};

export default compose(
  firebaseConnect([
    'votes' // { path: '/votes' } // object notation
  ]),
  connect((state) => ({
    votes: state.firebase.data.votes,
    profile: state.firebase.profile // load profile
  }))
)(Votes);