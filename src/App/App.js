import React, { Component } from 'react';
import Header from './components/Header'
import ConvertForm from './components/ConvertForm';
import HistoryList from './components/HistoryList';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ConvertForm />
        <HistoryList />
      </div>
    );
  }
}

export default App;
