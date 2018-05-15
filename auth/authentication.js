import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import validator from 'validator'


export const generateHash = password => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}




export const validateSignupCredentials = (credentials) => {
	let errors = {};
	let errorcount = 0;
	if (credentials.username === "") {errors.username = "Enter a valid username"; errorcount++}
	if (credentials.password === "") {errors.password = "Enter a valid password"; errorcount++}
	if (credentials.confirmPassword !== credentials.password) {errors.confirmPassword = "Passwords don't match"; errorcount++}
	if (!validator.isEmail(credentials.email)) {errors.email = "Enter a valid email"; errorcount++}

	if (errorcount === 0) return false
	else return errors

}



export const validateSigninCredentials = (credentials) => {
	let errors = {};
	let errorcount = 0;
	if (credentials.username === "") {errors.username = "Enter a valid username"; errorcount++}
	if (credentials.password === "") {errors.password = "Enter a valid password"; errorcount++}

	if (errorcount === 0) return false
	else return errors

}