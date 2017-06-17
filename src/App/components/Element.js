import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PreviousAction, CurrentAction } from '../actions';

import './stylesheets/list.css'

function mapDispatchToProps(dispatch) {
  return {
    deleteCurrent: (obj) => dispatch(PreviousAction.deleteCurrent(obj)),
    loadCurrent: (obj) => dispatch(CurrentAction.getUpdateCurrent(obj))
  }
} 

class Element extends Component {	
  static propTypes = {
    convert : PropTypes.shape({
      date: PropTypes.object,
      onReverse: PropTypes.bool,
      type: PropTypes.number,
      firstProportion: PropTypes.number,
      secondProportion: PropTypes.number 
    })
  };

  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.loadItem = this.loadItem.bind(this);
  }

  loadItem() {
    this.props.loadCurrent(this.props.convert);
  }

  deleteItem() {
    this.props.deleteCurrent(this.props.convert);
  }
  
  render() {
    const item = this.props.convert;
    return (
      <div className={this.props.className}>
        <strong> { item.date.toLocaleTimeString() } </strong>
        <div className='result'>
          <span> { item.first } </span>
          <strong> { !item.onReverse ? '→' : '←'  } </strong>
          <span> { item.second } </span>
        </div>
        <span className='control-element'>
          <button className='control-element-style load-button' onClick={ this.loadItem }> Load </button>
          <button className='control-element-style delete-button' onClick={ this.deleteItem }> X </button>
        </span>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Element);
