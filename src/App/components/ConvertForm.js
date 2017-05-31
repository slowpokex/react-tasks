import React, { Component } from 'react';

export default class ConvertForm extends Component {
	
	constructor(props) {
		super(props);
		this.handleFirstInput = this.handleFirstInput.bind(this);
		this.handleReverse = this.handleReverse.bind(this);
		this.handleSecondInput = this.handleSecondInput.bind(this);
		this.handleConvertClick = this.handleConvertClick.bind(this);
		
		this.state = {
			first: 0,
			onReverse: false,
			second: 0
		}
	}
	
	handleFirstInput(e) {
		this.setState({
			...this.state,
			first: e.target.value
		});
	}

	handleReverse(e) {
		e.preventDefault();
		this.setState({
			...this.state,
			onReverse: !this.state.onReverse
		});
	}

	handleSecondInput(e) {
		this.setState({
			...this.state,
			second: e.target.value
		});
	}

	handleConvertClick() {
		console.log('Click');
	}
	
	render() {
		return (
			<div>
				<input type='text' onChange={ this.handleFirstInput } value={ this.state.first }/>
				<button onClick={ this.handleReverse }>{ !this.state.onReverse ? '→' : '←' }</button>
				<input type='text' onChange={ this.handleSecondInput } value={ this.state.second }/>
				<button onClick={ this.handleConvertClick }>{ 'Convert' }</button>
			</div>
		)
	}
}