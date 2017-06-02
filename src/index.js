import 'babel-polyfill';
import ReactDOM from 'react-dom';
import App from './App/App';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import converterReducer from './App/reducers'

const store = createStore(converterReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store ={ store }>
    <App/>
  </Provider>, document.getElementById('root'));
module.hot.accept();
