import axios from 'axios'

export const search = request => dispatch => {
	return axios.get(`/api/search/request?request=${request}`)
	.then(res => {
		console.log(res.data.results, "1")
		return res.data.results
	})
	.then(results => {
		console.log(results, "2")
		dispatch(userSearched({searchResults:results}))
	})

}

export const userSearched = (results) => ({
	type: "USER_SEARCHED",
	results
})