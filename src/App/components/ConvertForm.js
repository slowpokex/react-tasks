import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initCurrent } from '../reducers';
import { CurrentAction } from '../actions'

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
  MILE: 1823,
  KILO: 1000,
  NONE: 1,
  CENTI: 0.01,
  MILLI: 0.001,
  OUNCE: 29.8
}

function mapStateToProps(state, dispatch, setState) {
  return {
    current: state.current,
    dispatch,
    set: setState
  }
}

function mapDispatchToProps(dispatch) {
    return {
      changeReverse: (value) => dispatch(CurrentAction.getSwitchAction(value)),
      changeType: (value) => dispatch(CurrentAction.getTypeAction(value)),
      submitToRecent: (obj) => {
        dispatch(CurrentAction.getUpdateCurrent(obj));
        dispatch(CurrentAction.addToRecent(obj));
        dispatch(CurrentAction.getDefault());
      },
      updateValues: (first, second) => {
        dispatch(CurrentAction.getFirstValue(first));
        dispatch(CurrentAction.getSecondValue(second));
      },
      updateFirstProportion: (value) => dispatch(CurrentAction.getFirstProportion(value)),
      updateSecondProportion: (value) => dispatch(CurrentAction.getSecondProportion(value))
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

    this.state = this.props.current;
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
    const secondValue = this.calculate(firstValue, this.state.firstProportion, this.state.secondProportion);
        
    this.setState({
      ...this.state,
      first: firstValue,
      second: secondValue
    });

    this.props.updateValues(firstValue, secondValue);
  }

  handleReverse(e) {
    const newValue = !this.state.onReverse;
    e.preventDefault();
    this.setState({
      ...this.state,
      onReverse: newValue
    });
    this.props.changeReverse(newValue);
  }

  handleSecondInput(e) {
    const firstValue = +e.target.value;
    const secondValue = this.calculate(+e.target.value, this.state.secondProportion, this.state.firstProportion);

    this.setState({
      ...this.state,
      second: firstValue,
      first: secondValue
    });

    this.props.updateValues(secondValue, firstValue);
  }

  handleConvertClick() {
    this.clearForm();
    this.props.submitToRecent(this.state);
  }

  handleTypeChange(e) {
    this.setState({
       ...this.state,
       type: +e.target.value
    });
    this.props.changeType(this.state.type);
  }

  changeSelector(e) {
      const value = +e.target.value;
      switch(e.target.id) {
        case PositionOfSelectors.FIRST: { 
            this.setState({
              ...this.state,
              firstProportion: value
            });
            this.props.updateFirstProportion(value);
          } break;

        case PositionOfSelectors.SECOND: { 
            this.setState({
              ...this.state,
              secondProportion: value
            });
            this.props.updateSecondProportion(value);
          } break;
      }
  }

  defaultSelectors() {
    const selectors = document.querySelectorAll('select');
    selectors.forEach((select) => {
      select.selectedIndex = 0;
    })
  }

  clearForm() {
    this.defaultSelectors();
    this.setState({
      ...initCurrent			
    });
  }

  returnLengthSelectorIndex(value) {
    switch(value) {
      case Multiplier.MILE: return 0;
      case Multiplier.KILO: return 1;
      case Multiplier.NONE: return 2;
      case Multiplier.CENTI: return 3;
      case Multiplier.MILLI: return 4;
    }
  }

  renderLengthSelector(position) {
    return (
      <select id={position} onChange={ this.changeSelector }>				
        <option value={ Multiplier.KILO }>Kilometer</option>
        <option value={ Multiplier.MILE }>Mile</option>
        <option value={ Multiplier.NONE }>Meter</option>
        <option value={ Multiplier.CENTI }>Centimeter</option>
        <option value={ Multiplier.MILLI }>Millimeter</option>
      </select>
    );
  }

  returnWeightSelectorIndex(value) {
    switch(value) {
      case Multiplier.KILO: return 0;
      case Multiplier.NONE: return 1;
      case Multiplier.MILLI: return 2;
      case Multiplier.OUNCE: return 3;
    }
  }

  renderWeightSelector(position) {
    return (
      <select id={position} onChange={ this.changeSelector }>
        <option value={ Multiplier.KILO }>Kilogram</option>
        <option value={ Multiplier.NONE }>Gram</option>
        <option value={ Multiplier.MILLI }>Milligram</option>
        <option value={ Multiplier.OUNCE }>Ounce</option>
      </select>
    );
  }

  calculate(first, firstProportion, secondProportion) {
    return (first * firstProportion) / secondProportion
  }

  returnConverterTypeIndex(value) {
    switch(value) {
      case ConverterType.WEIGHT: return 0;
      case ConverterType.LENGTH: return 1;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ConvertForm);
