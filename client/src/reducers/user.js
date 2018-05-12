export default (state = {}, action = {}) => {
	switch (action.type) {
		case "USER_SEARCHED":
			return action.results
			
		case "USER_GOING":
			return changeGoerReduxState(state, action.businessId, 1)
			
		case "USER_NOT_GOING":
			return changeGoerReduxState(state, action.businessId, -1)



		default: return state;
	}
}



const changeGoerReduxState = (state, id, incrementVal) => {


	return {...state, searchResults: state.searchResults.map(content => {
		
		if (content.businessId === id) {
			return {...content, businessGoers: (content.businessGoers + incrementVal)}
		} else {
			return content
		}

		})
}

}


