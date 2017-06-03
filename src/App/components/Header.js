import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div>
        <h2>Converter</h2>
        <h3>Small disclaimer</h3>
        <p>
          This converter convert to result in the disabled input,
          when you was focused on the input element and then leave from it!
        </p>
      </div>
    );
  }
}
