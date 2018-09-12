import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { withFirebase } from 'react-redux-firebase';

const Buttons = ({ firebase }) => {
//   const sampleVote = 1;
  const pushVote = (vote) => firebase.push('votes', vote);
  return (
    <div>
      <ButtonGroup>
        <Button onClick={pushVote[1]} bsStyle="primary">Button 1</Button>
        <Button onClick={pushVote[2]} bsStyle="info">Button 2</Button>
        <Button onClick={pushVote[3]} bsStyle="success">Button 3</Button>
      </ButtonGroup>   
    </div>
  );
};

export default withFirebase(Buttons);