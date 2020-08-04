import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './Components/store';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import history from './history';
import Container from "./Components/NavBar/Container"
import './fonts/Montserrat/Montserrat-Regular.ttf';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:3000",
  cache: new InMemoryCache()
});

const store = configureStore();

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <Container />
    <Router history={history}>
      <div className="App">
        <Routes />
      </div>
    </Router>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

