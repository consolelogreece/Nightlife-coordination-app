import axios from 'axios'


export const signin = credentials => dispatch => {
	return axios.post('/api/auth/signin', { credentials })
		.then(user => {
			console.log(user.data.data.going)
			localStorage.nightlifeJWT = user.data.data.JWT;
			localStorage.nightlifeEmail = user.data.data.email;
			localStorage.nightlifeGoingArray = user.data.data.going;
			dispatch(userSignedIn(user.data.data))
			return user
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



export const logout = () => dispatch => {
	localStorage.clear();
	dispatch(userLoggedOut())
}


export const userLoggedOut = () => ({
	type:"USER_SIGNED_OUT"
});


export const changePassword = credentials => dispatch => {
	return axios.post('/api/auth/changePassword', { credentials }).then(data => {
		localStorage.clear();
		dispatch(userLoggedOut()) // essentially want to log out the user after changing password.
	})
}