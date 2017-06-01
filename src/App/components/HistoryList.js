import React, { Component } from 'react';
import { connect } from 'react-redux'

function mapStateToProps(state, dispatch) {
  return {
    current: state,
	dispatch
  }
}

class HistoryList extends Component {

	constructor(props){
		super(props);
		this.clearHistory = this.clearHistory.bind(this);
	}

	clearHistory() {
		this.props.dispatch({ type: 'CLEAR_RECENT' });
	}

	render() {
		return (
			<div>
				<h3>Recent converts:</h3>
				<ul>
					{ this.props.current.previous.map( (item, i) => <li key={i}> { JSON.stringify(item) } </li> ) }
				</ul>
				<button onClick = { this.clearHistory }>Clear history</button>
			</div>
		);
	}
}

export default connect(mapStateToProps)(HistoryList);