import axios from 'axios'

export const going = request => dispatch => {
	//return axios.post('/api/going/', {request})
	//then(response => {

		dispatch(userGoing(request))
		return
	//})
}



export const notGoing = request => dispatch => {
	// return axios.post('/api/notGoing/', {request})
	// .then(response => {
		dispatch(userNotGoing(request))
		return
	//})
}



export const userGoing = (businessId) => ({
	type: "USER_GOING",
	businessId
})



export const userNotGoing = (businessId) => ({
	type: "USER_NOT_GOING",
	businessId
})