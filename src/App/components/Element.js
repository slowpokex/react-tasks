import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(dispatch) {
  return {
    dispatch
  }
} 

class Element extends Component {	
  static propTypes = {
    convert : PropTypes.shape({
      date: PropTypes.date,
      first: PropTypes.number,
      onReverse: PropTypes.bool,
      second: PropTypes.number,
      type: PropTypes.number,
      firstProportion: PropTypes.number,
      secondProportion: PropTypes.number 
    })
  }

  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.loadItem = this.loadItem.bind(this);
  }

  loadItem() {

  }

  deleteItem() {
    this.props.dispatch({type: 'CLEAR_CURRENT_RECENT', payload: this.props.convert });
  }
  
  render() {
    return (
      <div>
        <span>{ JSON.stringify(this.props.convert) }</span>
        <button onClick={ this.loadItem }>Load</button>
        <button onClick={ this.deleteItem }>X</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Element);
