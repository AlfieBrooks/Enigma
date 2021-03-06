import PropTypes from 'prop-types';
import React from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { ACCOUNT_TYPES } from '../utils/account-type-constants';
import { CompanySignUp } from './company-sign-up-form';
import { InterpreterSignUp } from './interpreter-sign-up-form';
import { SpinnerPage } from './spinner';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitHandler = userDetails => {
    userDetails.accountType === ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY
      ? this.props.accountCompanySignUp(userDetails)
      : this.props.accountInterpreterSignUp(userDetails);
  };

  renderSignUp = () => (
    <Row className="justify-content-md-center">
      <Col md="9" className="sign-in__column">
        <Tabs defaultActiveKey={ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY} id="uncontrolled-tab-example">
          <Tab eventKey={ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY} title={ACCOUNT_TYPES.ACCOUNT_TYPE_COMPANY}>
            <CompanySignUp submitHandler={this.submitHandler} />
          </Tab>
          <Tab eventKey={ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER} title={ACCOUNT_TYPES.ACCOUNT_TYPE_INTERPRETER}>
            <InterpreterSignUp submitHandler={this.submitHandler} />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );

  render() {
    return (
      <Container className="sign-in__container">
        {this.props.account.isAuthenticated && <Redirect to="/" />}
        {this.props.account.loading ? <SpinnerPage /> : this.renderSignUp()}
      </Container>
    );
  }
}

SignUp.propTypes = {
  account: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }),
  accountCompanySignUp: PropTypes.func.isRequired,
  accountInterpreterSignUp: PropTypes.func.isRequired,
};
