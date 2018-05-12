import axios from 'axios'

export const search = request => dispatch => {
	return axios.get(`/api/search/request?request=${request}`)
	.then(results => {
		dispatch(userSearched({searchResults:results.data}))
		return results.data // may not need
	})
	

		
		


	//catch statement handeled at the initial call. Errors bubble up.

}

export const userSearched = (results) => ({
	type: "USER_SEARCHED",
	results
})