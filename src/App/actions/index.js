export class CurrentAction {
  static getSwitchAction(value) {
    return { type: 'SWITCH_REVERSE', payload: value }
  }

  static getTypeAction(type) {
    return { type: 'UPDATE_TYPE', payload: type }
  }

  static getUpdateCurrent(obj) {
    return { type: 'UPDATE_CURRENT', obj }
  }

  static addToRecent(obj) {
    return { type: 'ADD_TO_RECENT', payload: obj }
  }

  static getDefault() {
    return { type: 'DEFAULT_CURRENT' }
  }

  static getFirstValue(value) {
    return { type: 'UPDATE_FIRST_VALUE', payload: value }
  }

  static getSecondValue(value) {
    return { type: 'UPDATE_SECOND_VALUE', payload: value }
  }

  static getFirstProportion(value) {
    return { type: 'UPDATE_FIRST_PROPORTION', payload: value }
  }

  static getSecondProportion(value) {
    return { type: 'UPDATE_FIRST_PROPORTION', payload: value }
  }
}

export class PreviouAction {

}
