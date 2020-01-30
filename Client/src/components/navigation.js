import PropTypes from 'prop-types';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { accountSignOut } from '../redux/account/account-actions';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="navigation__container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
          <Navbar.Brand as={Link} to="/" href="/">
            <img
              src="../../public/signly-logo.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/booking" href="/booking">
                Book
              </Nav.Link>
              <Nav.Link as={Link} to="/info" href="/info">
                More Info
              </Nav.Link>
            </Nav>
            <Nav>
              {this.props.isisAuthenticated ? (
                <NavDropdown title={this.props.accountDetails.email} id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/account" href="/account">
                    Account Details
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.props.accountSignOut}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/sign-in" href="/sign-in">
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  accountDetails: account.details,
  isisAuthenticated: account.isAuthenticated,
});

export const NavigationComponent = connect(mapStateToProps, { accountSignOut })(Navigation);

Navigation.propTypes = {
  accountDetails: PropTypes.shape({
      email: PropTypes.string,
  }),
  accountSignOut: PropTypes.func,
  isisAuthenticated: PropTypes.bool,
};
