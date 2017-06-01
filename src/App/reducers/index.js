import { combineReducers } from 'redux';
import { ConverterType } from '../components/ConvertForm'
const initialState = [];

const initCurrent = {
            first: 0,
            onReverse: false,
            second: 0,
            type: ConverterType.WEIGHT,
            firstProportion: 1000,
            secondProportion: 1000 
        }

export function previous(state = initialState, action) {
    switch (action.type) { 
        case 'ADD_TO_RECENT': return [...state, action.payload];
        case 'CLEAR_RECENT' : return initialState;
    }
    return state;
}

export function current(curr = initCurrent, action) {
    switch (action.type) {
        case 'DEFAULT_CURRENT' : return { ...initCurrent }
        case 'SWITCH_REVERSE' : return { ...curr, onReverse: action.payload }
        case 'UPDATE_CURRENT' : return { ...action.payload }
        case 'UPDATE_FIRST_PROPORTION' : return { ...curr, firstProportion: action.payload }
        case 'UPDATE_SECOND_PROPORTION' : return { ...curr, secondProportion: action.payload }
        case 'UPDATE_FIRST_VALUE' : return { ...curr, first: action.payload }
        case 'UPDATE_SECOND_VALUE' : return { ...curr, second: action.payload }
        case 'UPDATE_TYPE' : return { ...curr, type: action.payload }
    }
    return curr;
}

export default combineReducers({
    previous, current
});