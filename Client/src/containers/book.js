import React from 'react';
import { Container } from 'react-bootstrap';

export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="home__container">
        <h1> Book</h1>
      </Container>
    );
  }
}
