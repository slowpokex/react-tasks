import React, { Component } from 'react';

export const ConverterType = {
	WEIGHT: 1,
	LENGTH: 2,
	VOLUME: 3
}

export default class ConvertForm extends Component {
	
	constructor(props) {
		super(props);
		this.handleFirstInput = this.handleFirstInput.bind(this);
		this.handleReverse = this.handleReverse.bind(this);
		this.handleSecondInput = this.handleSecondInput.bind(this);
		this.handleConvertClick = this.handleConvertClick.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		
		this.state = {
			first: 0,
			onReverse: false,
			second: 0,
			type: ConverterType.WEIGHT
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

	handleTypeChange(e) {
		console.log(e.target.value);
		this.setState({
			...this.state,
			type: +e.target.value
		});
	}

	renderLengthSelector() {
		return (
			<select>
				<option value='1000'>Kilometer</option>
				<option value='1'>Meter</option>
				<option value='0.001'>Centimeter</option>
			</select>
		);
	}

	renderWeightSelector() {
		return (
			<select>
				<option value='1000'>Kilogram</option>
				<option value='1'>Gram</option>
				<option value='0.001'>Milligram</option>
			</select>
		);
	}


	
	render() {

		const elements = ((i) => {
			switch(i) {
				case ConverterType.WEIGHT: return this.renderWeightSelector();
				case ConverterType.LENGTH: return this.renderLengthSelector();
			}
		});

		return (
			<div>
				<div>
					<input type='text' onChange={ this.handleFirstInput } value={ this.state.first }/>
					<button onClick={ this.handleReverse }>{ !this.state.onReverse ? '→' : '←' }</button>
					<input type='text' onChange={ this.handleSecondInput } value={ this.state.second }/>
					<button onClick={ this.handleConvertClick }>{ 'Convert' }</button>
				</div>
				<div>
					<div>
						<select onChange = { this.handleTypeChange }>
							<option value = { ConverterType.WEIGHT }>Weight</option>
							<option value = { ConverterType.LENGTH }>Length</option>
						</select>
						<div>
							{ elements(this.state.type) }
						</div>
						<div>
							{ elements(this.state.type) }
						</div>
					</div>
				</div>
			</div>
		)
	}
}