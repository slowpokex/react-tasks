import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrentAction } from '../actions';
import './stylesheets/form.css';

export const ConverterType = {
  WEIGHT: 1,
  LENGTH: 2,
  VOLUME: 3
};

export const PositionOfSelectors = {
  FIRST: 'first',
  SECOND: 'second'
};

export const Multiplier = {
  MILE: 1823,
  KILO: 1000,
  NONE: 1,
  CENTI: 0.01,
  MILLI: 0.001,
  OUNCE: 29.8
};

function mapStateToProps(state) {
  return {
    current: state.current
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
      updateFirstValue: (value) => dispatch(CurrentAction.getFirstValue(value)),
      updateSecondValue: (value) => dispatch(CurrentAction.getSecondValue(value)),
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
    this.refreshValues = this.refreshValues.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Setting current properties
    const current = nextProps.current;

    // Setting selectors
    const type = current.type;
    this.mainSelector.selectedIndex = ConvertForm.returnConverterTypeIndex(type);

    //Get depends selectors
    ConvertForm.setDependsSelectorsIndex(type, current.firstProportion, current.secondProportion);
  }

  static setDependsSelectorsIndex(type, firstProportion, secondProportion){
    const firstSelector = document.querySelector(`[name=${ PositionOfSelectors.FIRST }]`);
    const secondSelector = document.querySelector(`[name=${ PositionOfSelectors.SECOND }]`);

    switch (type) {
      case ConverterType.WEIGHT: {
        firstSelector.selectedIndex = ConvertForm.returnWeightSelectorIndex(firstProportion);
        secondSelector.selectedIndex = ConvertForm.returnWeightSelectorIndex(secondProportion);
      } break;
      case ConverterType.LENGTH: {
        firstSelector.selectedIndex = ConvertForm.returnLengthSelectorIndex(firstProportion);
        secondSelector.selectedIndex = ConvertForm.returnLengthSelectorIndex(secondProportion);
      } break;
    }
  }

  handleFirstInput(e) {
    this.props.updateFirstValue(e.target.value);
  }

  handleReverse() {
    this.props.changeReverse(!this.props.current.onReverse);
  }

  handleSecondInput(e) {
    this.props.updateSecondValue(e.target.value);
  }

  refreshValues() {
    const current = this.props.current;
    const firstValue = !current.onReverse ? current.first : current.second;
    const firstProp = !current.onReverse ? current.firstProportion : current.secondProportion;
    const secondProp = current.onReverse ? current.firstProportion : current.secondProportion;
    const secondValue = ConvertForm.calculate(firstValue, firstProp, secondProp);

    if (!current.onReverse) {
      this.props.updateValues(firstValue, secondValue)
    } else {
      this.props.updateValues(secondValue, firstValue);
    }
  }

  handleConvertClick() {
    ConvertForm.defaultSelectors();
    this.props.submitToRecent(this.props.current);
  }

  handleTypeChange(e) {
    this.props.changeType(+e.target.value);
  }

  changeSelector(e) {
      const value = +e.target.value;
      switch(e.target.name) {
        case PositionOfSelectors.FIRST: {
            this.props.updateFirstProportion(value);
          } break;

        case PositionOfSelectors.SECOND: {
            this.props.updateSecondProportion(value);
          } break;
      }
  }

  static defaultSelectors() {
    const selectors = document.querySelectorAll('select');
    selectors.forEach((select) => {
      select.selectedIndex = 0;
    })
  }

  static returnLengthSelectorIndex(value) {
    switch(value) {
      case Multiplier.KILO: return 0;
      case Multiplier.MILE: return 1;
      case Multiplier.NONE: return 2;
      case Multiplier.CENTI: return 3;
      case Multiplier.MILLI: return 4;
    }
  }

  renderLengthSelector(position) {
    return (
      <select name={ position } onChange={ this.changeSelector } onBlur={ this.refreshValues }>
        <option value={ Multiplier.KILO }>Kilometer</option>
        <option value={ Multiplier.MILE }>Mile</option>
        <option value={ Multiplier.NONE }>Meter</option>
        <option value={ Multiplier.CENTI }>Centimeter</option>
        <option value={ Multiplier.MILLI }>Millimeter</option>
      </select>
    );
  }

  static returnWeightSelectorIndex(value) {
    switch(value) {
      case Multiplier.KILO: return 0;
      case Multiplier.NONE: return 1;
      case Multiplier.MILLI: return 2;
      case Multiplier.OUNCE: return 3;
    }
  }

  renderWeightSelector(position) {
    return (
      <select name={ position } onChange={ this.changeSelector } onBlur={ this.refreshValues }>
        <option value={ Multiplier.KILO }>Kilogram</option>
        <option value={ Multiplier.NONE }>Gram</option>
        <option value={ Multiplier.MILLI }>Milligram</option>
        <option value={ Multiplier.OUNCE }>Ounce</option>
      </select>
    );
  }

  static calculate(first, firstProportion, secondProportion) {
    return (first * firstProportion) / secondProportion
  }

  static returnConverterTypeIndex(value) {
    switch(value) {
      case ConverterType.WEIGHT: return 0;
      case ConverterType.LENGTH: return 1;
    }
  }
    
  render() {
    const current = this.props.current;

    const elements = ((i, position) => {
      switch(i) {
        case ConverterType.WEIGHT: return this.renderWeightSelector(position);
        case ConverterType.LENGTH: return this.renderLengthSelector(position);
      }
    });

    return (
      <div>
        <div>
          <input type='text'
                 className='input'
                 onChange={ this.handleFirstInput }
                 onBlur={ this.refreshValues }
                 value={ current.first }
                 disabled={ current.onReverse }/>
          <button className='revert-button form-button-style'
            onClick={ this.handleReverse }>
            { !current.onReverse ? '→' : '←' }
          </button>
          <input type='text'
                 className='input'
                 onChange={ this.handleSecondInput }
                 onBlur={ this.refreshValues }
                 value={ current.second }
                 disabled={ !current.onReverse }/>
          <button className='add-button form-button-style' onClick={ this.handleConvertClick }>
            { 'Add to recent' }
          </button>
        </div>
          <ul className='selector-group'>
            <li>
              <select
                className='selector'
                ref={(select) => this.mainSelector = select}
                onChange = { this.handleTypeChange }
                onBlur={ this.refreshValues }>
                <option value = { ConverterType.WEIGHT }>Weight</option>
                <option value = { ConverterType.LENGTH }>Length</option>
              </select>
            </li>
            <li>
              { elements(current.type, PositionOfSelectors.FIRST) }
            </li>
            <li>
              { elements(current.type, PositionOfSelectors.SECOND) }
            </li>
          </ul>
      </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConvertForm);
