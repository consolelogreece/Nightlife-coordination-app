export default (state = {}, action = {}) => {
	switch (action.type) {
		case "USER_SEARCHED":
			console.log(action)
			return {...state, searchResults: action.results.searchResults}
			
		case "USER_GOING":
			return changeGoerReduxState(state, action.businessId, 1)
			
		case "USER_NOT_GOING":
			return changeGoerReduxState(state, action.businessId, -1)


		case "USER_SIGNED_IN":
			return {...state, userData: action.user.data.data}

		case "USER_SIGNED_UP":
			return state

		default: return state;
	}
}

const changeGoerReduxState = (state, id, incrementVal) => {

	return ({...state, searchResults: state.searchResults.map(content => {
		
		return (
		 		content.businessId === id   ? {...content, businessGoers: (content.businessGoers + incrementVal)}
										    : content
		)

	})})
}

