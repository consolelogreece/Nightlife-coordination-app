export default (state = {}, action = {}) => {
	switch (action.type) {
		case "USER_SEARCHED":
			return action.results

		default: return state;
	}
}