import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss';

import SignUp from './components/sign-up';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/booking">
          <SignUp />
        </Route>
        <Route exact path="/about">
          <SignUp />
        </Route>
        <Route path="/*">
          <div>
            <p>404 - Something went wrong :(</p>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<Routes />, document.getElementById('root'));
