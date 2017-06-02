import React, { Component } from 'react';
import { connect } from 'react-redux';
import Element from './Element';

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
	}

	clearHistory() {
		this.props.dispatch({ type: 'CLEAR_ALL_RECENT' });
	}

	render() {
		const clearButton = <button onClick = { this.clearHistory }>Clear history</button>;
		return (
			<div>
				<h3>{this.props.previous.length ? 'Recent converts:' : null }</h3>
				<ul>
					{ this.props.previous.map( (item, i) => <Element li key={i} convert={item}/> ) }
				</ul>
				{ this.props.previous.length ? clearButton : null }
			</div>
		);
	}
}

export default connect(mapStateToProps)(HistoryList);
