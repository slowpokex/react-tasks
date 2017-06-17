import React, { Component } from 'react';
import Header from './components/Header'
import ConvertForm from './components/ConvertForm';
import HistoryList from './components/HistoryList';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <div className='wrapper'>
          <ConvertForm />
          <HistoryList />
        </div>
      </div>
    );
  }
}

export default App;
