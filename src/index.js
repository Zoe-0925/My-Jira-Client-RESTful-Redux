import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './Components/store';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import history from './history';
import Container from "./Components/NavBar/Container"
import './fonts/Montserrat/Montserrat-Regular.ttf';

const store = configureStore();

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Provider store={store}>
    <Container />
    <Router history={history}>
      <div className="App">
        <Routes />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

