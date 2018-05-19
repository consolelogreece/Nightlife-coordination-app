import axios from 'axios'

export const going = request => dispatch => {
	return axios.post('/api/going/', {request})
		.then(response => {
			switch (response.data.setStatus) {
				case "going":
						dispatch(userGoing(response))
						break
				case "notGoing":
						dispatch(userNotGoing(response))
						break 
				default:

			}
			return response.data.setStatus
		})
}

export const userGoing = request => ({
	type: "USER_GOING",
	request
})



export const userNotGoing = request => ({
	type: "USER_NOT_GOING",
	request
})




export const getGoing = request => {
	return axios.post('/api/getGoing/', { request })
}


export const userGetGoing = request => {
	return ({
		type:"GET_GOING",
		request
	})

}
