import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss';

//Pages
import { Home as HomePage } from './containers/home';
import { BookingPage } from './containers/booking';
import { SignInPage } from './containers/sign-in';
import { SignUpPage } from './containers/sign-up';

//Components
// import { ModalFactory } from './components/modal-factory'; POC
import { NavigationComponent } from './components/navigation';

function Routes() {
  return (
    <Router>
      <NavigationComponent />
      {/* <ModalFactory /> */}
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
        <Route exact path="/booking">
          <BookingPage />
        </Route>
        <Route exact path="/info">
          <SignInPage />
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
