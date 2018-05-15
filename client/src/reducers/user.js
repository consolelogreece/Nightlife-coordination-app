export default (state = {}, action = {}) => {
	switch (action.type) {
		case "USER_SEARCHED":
			return action.results
			
		case "USER_GOING":
			return changeGoerReduxState(state, action.businessId, 1)
			
		case "USER_NOT_GOING":
			return changeGoerReduxState(state, action.businessId, -1)


		case "USER_SIGNED_IN":
			return action.user

		case "USER_SIGNED_UP":
			return action.user

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

