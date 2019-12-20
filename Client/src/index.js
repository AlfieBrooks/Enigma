import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './index.css';
import App from './App';

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/signup">
          <App />
        </Route>
        <Route exact path="/booking">
          <App />
        </Route>
        <Route exact path="/about">
          <App />
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