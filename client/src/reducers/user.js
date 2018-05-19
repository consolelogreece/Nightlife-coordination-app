export default (state = {}, action = {}) => {
	switch (action.type) {
		case "USER_SEARCHED":
			return {...state, searchResults: action.results.searchResults}

		case "GET_GOING":
			return {...state, going: action.request.data.data}
			
		case "USER_GOING":
			return changeGoerReduxState(state, action.request.data.businessId, 1)
			
		case "USER_NOT_GOING":
			return changeGoerReduxState(state, action.request.data.businessId, -1)

		case "USER_SIGNED_IN":
			return {...state, token: action.user.JWT, email:action.user.email }

		case "USER_SIGNED_OUT": 
			return { going:[] }

		case "USER_SIGNED_UP":
			return state

		default: return state;
	}
}





const changeGoerReduxState = (state, id, incrementVal) => {

	let going = state.going;
	
	(function alterGoingArray(){
		if (incrementVal === 1){
			going.push(id)
		} else {
			const index = going.indexOf(id);
			if (index !== -1) going.splice(index, 1);
		}
	})();


	return ({...state, going:going, searchResults: state.searchResults.map(content => {
		
		return (
		 		content.businessId === id   ? {...content, businessGoers: (content.businessGoers + incrementVal)}
										    : content
		)

	})})
}

