import React from 'react';
import { Button, Container, Jumbotron } from 'react-bootstrap';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="home__container">
        <h1 className="home__title">Enigma</h1>
        <Jumbotron className="home__jumbotron">
          <p className="home__subtitle">
            The website that puts companies in touch with deaf interpreters for event bookings. Whether you want you
            company to be able to book deaf interpreters or if you're a interpreter yourself, sign up now and see how
            Enigma can spark your companies inclusiveness or your career!
          </p>
          <p className="home__button">
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </Container>
    );
  }
}
