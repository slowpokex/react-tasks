import React, { Component } from 'react';

class Element extends Component {
  render() {
    return (
      <div>
        <span>{ JSON.stringify(this.props.convert) }</span>
        <button>Load</button>
        <button>Delete</button>
      </div>
    );
  }
}

export default Element;