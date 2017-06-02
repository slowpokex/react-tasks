import React, { Component } from 'react';
import { connect } from 'react-redux';

export const ConverterType = {
    WEIGHT: 1,
    LENGTH: 2,
    VOLUME: 3
}

export const PositionOfSelectors = {
    FIRST: 'first',
    SECOND: 'second'
}

export const Multiplier = {
  KILO: 1000,
  NONE: 1,
  CENTI: 0.01,
  MILLI: 0.001
}

function mapStateToProps(state, dispatch, setState) {
  return {
    current: state,
    dispatch,
    set: setState
  }
}

class ConvertForm extends Component {
    
    constructor(props) {
        super(props);
        this.handleFirstInput = this.handleFirstInput.bind(this);
        this.handleReverse = this.handleReverse.bind(this);
        this.handleSecondInput = this.handleSecondInput.bind(this);
        this.handleConvertClick = this.handleConvertClick.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.changeSelector = this.changeSelector.bind(this);
        this.changeFirstInput = this.changeFirstInput.bind(this);
        this.changeSecondInput = this.changeSecondInput.bind(this);

        let { current } = this.props.current;
        this.state = current;
    }

    changeFirstInput(e) {
        this.setState({
            ...this.state,
            first: e.target.value,
        });
    }

    changeSecondInput(e) {
      this.setState({
            ...this.state,
            second: e.target.value,
        });
    }
    
    handleFirstInput(e) {
        const firstValue = +e.target.value;
        const secondValue = this.calculate(+e.target.value, this.state.firstProportion, this.state.secondProportion);
        
        this.setState({
            ...this.state,
            first: firstValue,
            second: secondValue
        });

        this.props.dispatch({ type: 'UPDATE_FIRST_VALUE', payload: firstValue })
        this.props.dispatch({ type: 'UPDATE_SECOND_VALUE', payload: secondValue })
    }

    handleReverse(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            onReverse: !this.state.onReverse
        });
        this.props.dispatch({ type: 'SWITCH_REVERSE', payload: !this.state.onReverse })
    }

    handleSecondInput(e) {
        this.setState({
            ...this.state,
            second: +e.target.value
        });
        this.props.dispatch({ type: 'UPDATE_SECOND_VALUE', payload: +e.target.value }) 
    }

    handleConvertClick() {
        this.props.dispatch({ type: 'UPDATE_CURRENT', payload: this.state });
        this.props.dispatch({ type: 'ADD_TO_RECENT', payload: this.state });
        this.props.dispatch({ type: 'DEFAULT_CURRENT' });
    }

    handleTypeChange(e) {
        this.setState({
            ...this.state,
            type: +e.target.value
        });
        this.props.dispatch({ type: 'UPDATE_TYPE', payload: this.state.type })
    }

    changeSelector(e) {
        
        switch(e.target.name) {

            case PositionOfSelectors.FIRST: { 
                this.setState({
                    ...this.state,
                    firstProportion: +e.target.value
                });
                this.props.dispatch({ type: 'UPDATE_FIRST_PROPORTION', payload: +e.target.value })
             } break;

            case PositionOfSelectors.SECOND: { 
                this.setState({
                    ...this.state,
                    secondProportion: +e.target.value
                });
                this.props.dispatch({ type: 'UPDATE_SECOND_PROPORTION', payload: +e.target.value })
             } break;
        }
    }

    renderLengthSelector(position) {
        return (
            <select name={position} onChange={ this.changeSelector }>
                <option value={ Multiplier.KILO }>Kilometer</option>
                <option value={ Multiplier.NONE }>Meter</option>
                <option value={ Multiplier.CENTI }>Centimeter</option>
            </select>
        );
    }

    renderWeightSelector(position) {
        return (
            <select name={position} onChange={ this.changeSelector }>
                <option value={ Multiplier.KILO }>Kilogram</option>
                <option value={ Multiplier.NONE }>Gram</option>
                <option value={ Multiplier.MILLI }>Milligram</option>
            </select>
        );
    }

    calculate(first, firstProportion, secondProportion) {
        return (first * firstProportion) / secondProportion
    }
    
    render() {
      
        const elements = ((i, position) => {
            switch(i) {
                case ConverterType.WEIGHT: return this.renderWeightSelector(position);
                case ConverterType.LENGTH: return this.renderLengthSelector(position);
            }
        });

        return (
            <div>
                <div>
                    <input type='text' onChange={ this.changeFirstInput } onBlur={ this.handleFirstInput } value={ this.state.first } disabled={ this.state.onReverse }/>
                    <button onClick={ this.handleReverse }>{ !this.state.onReverse ? '→' : '←' }</button>
                    <input type='text' onChange={ this.changeSecondInput } onBlur={ this.handleSecondInput } value={ this.state.second } disabled={ !this.state.onReverse }/>
                    <button onClick={ this.handleConvertClick }>{ 'Add to recent' }</button>
                </div>
                <div>
                    <div>
                        <select onChange = { this.handleTypeChange }>
                            <option value = { ConverterType.WEIGHT }>Weight</option>
                            <option value = { ConverterType.LENGTH }>Length</option>
                        </select>
                        <div>
                            { elements(this.state.type, PositionOfSelectors.FIRST) }
                        </div>
                        <div>
                            { elements(this.state.type, PositionOfSelectors.SECOND) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ConvertForm);
