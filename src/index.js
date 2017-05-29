import 'babel-polyfill';
import ReactDOM from 'react-dom';
import App from './App/App';
import React from 'react';

//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
module.hot.accept();