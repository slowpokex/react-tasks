import React, { Component } from 'react';
import './stylesheets/header.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className='header'>
          <span>Converter</span>
        </div>
        <div className='content'>
          <h3>Small disclaimer</h3>
          <p>
            This converter convert to result in the disabled input,
            when you was focused on the input element and then leave from it!
          </p>
        </div>
      </div>
    );
  }
}
