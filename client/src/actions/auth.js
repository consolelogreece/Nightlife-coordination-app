import axios from 'axios'


export const signin = credentials => dispatch => {
	return axios.post('/api/auth/signin', { credentials })
		.then(data =>{
		 dispatch(userSignedIn(data))
		 return data
		})

}


export const userSignedIn = (user) => {
	return ({
		type:"USER_SIGNED_IN",
		user
	})
}




export const signup = credentials => dispatch => {
	return axios.post('/api/auth/signup', { credentials })
		.then(data =>{
		 dispatch(userSignedUp(data))
		 return data
		})

}


export const userSignedUp = (user) => {
	return ({
		type:"USER_SIGNED_UP",
		user
	})
}