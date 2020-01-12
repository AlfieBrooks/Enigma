import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { accountSignOut } from '../redux/account';
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="navigation__container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand as={Link} to="/">
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
              <Nav.Link as={Link} to="/booking">
                Book
              </Nav.Link>
              <NavDropdown title="About Us" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/info">
                  More Information
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/contact">
                  Contact Us
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {this.props.account.authenticated ? (
                <NavDropdown title={this.props.account.email} id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/account">
                    Account Details
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.props.accountSignOut}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/sign-in">
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

const mapStateToProps = state => ({
  account: state.account,
});

export const NavigationComponent = connect(mapStateToProps, { accountSignOut })(Navigation);
