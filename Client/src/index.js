import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { NavigationComponent } from './components/navigation';
import { AccountPage } from './containers/account';
import { BookingPage } from './containers/booking';
import { Home as HomePage } from './containers/home';
import { SignInPage } from './containers/sign-in';
import { SignUpPage } from './containers/sign-up';
import { rootReducer } from './redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

function AuthRouter(props) {
  return (
    <Route {...props}>{store.getState().account.isAuthenticated ? props.children : <Redirect to="/sign-in" />}</Route>
  );
}

function Routes() {
  return (
    <Router>
      <NavigationComponent />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/sign-up">
          <SignUpPage />
        </Route>
        <Route exact path="/sign-in">
          <SignInPage />
        </Route>
        <AuthRouter exact path="/booking">
          <BookingPage />
        </AuthRouter>
        <AuthRouter exact path="/account">
          <AccountPage />
        </AuthRouter>
        <Route exact path="/info">
          <HomePage />
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

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
