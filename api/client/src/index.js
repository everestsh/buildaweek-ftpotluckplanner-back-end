import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import { render } from 'react-dom'
import App from './App'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import './style.css';

const store = createStore(reducer)


render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

