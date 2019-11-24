import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, SET_INIT } from './redux/store';

const root = document.querySelector('#root');

const Root = () => (
    <Provider store={store}>
      <HashRouter>
        <Route
            path="/:page?"
            component={App}
        />

      </HashRouter>
    </Provider>
  )

ReactDOM.render(<Root />, root);
