import React, { Component } from 'react';
import { connect } from 'react-redux';
import Element from './Element';

import './stylesheets/list.css';

function mapStateToProps(state, dispatch) {
  return {
    previous: state.previous,
    dispatch
  }
}

class HistoryList extends Component {

  constructor(props){
    super(props);
    this.clearHistory = this.clearHistory.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      isHide: false
    }
  }

  hide(){
    this.setState({
      ...this.state,
      isHide: !this.state.isHide
    });
  }

  clearHistory() {
    this.props.dispatch({ type: 'CLEAR_ALL_RECENT' });
  }

  render() {
    const length = this.props.previous.length;
    const clearButton = <button
      className='control-element control-element-style delete-button'
      onClick = { this.clearHistory }>Clear history</button>;
    const hiddenElements = (
      <div>
        <div >
          { this.props.previous.map( (item, i) => <Element className='history-element' key={i} convert={item}/> ) }
        </div>
        { length ? clearButton : null }
      </div>);

    const elements = (
      <div>
        <div className='history-header'>
          Recent converts : { length }
          <button
            className='hide-button delete-button'
            onClick={ this.hide }>{ !this.state.isHide ? 'Hide' : 'Show' }</button>
        </div>
        { !this.state.isHide ? hiddenElements : null }
      </div>);

    return (
      <div className={ length ? 'history-list' : '' }>
        { length ? elements : null }
      </div>
    );
  }
}

export default connect(mapStateToProps)(HistoryList);
