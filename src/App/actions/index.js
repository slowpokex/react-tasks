export class CurrentAction {
	static getSwitchAction(value) {
		return { type: 'SWITCH_REVERSE', payload: value }
	}
}

export class PreviouAction {

}