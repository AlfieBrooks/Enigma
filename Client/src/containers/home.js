import React from 'react';
import { Container } from 'react-bootstrap';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="home__container">
        <h1> Welcome</h1>
      </Container>
    );
  }
}
