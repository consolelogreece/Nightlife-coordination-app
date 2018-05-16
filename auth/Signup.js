import { validateSignupCredentials, generateHash } from './authentication'



const Signup = (req, res, databaseObject) => {
	const credentials = req.body.credentials
	
	// validateSignUpCredentials function returns 'false' if the credentials are valid. 
	if (validateSignupCredentials(credentials)) {
			//This will only trigger if the user alters the code client side, as there is client side validation. Thus there is no need for a more in depth error message.
			return new Promise((resolve, reject) => {resolve({type:"general", message:"something went wrong", code:400})})
	}


	const db = databaseObject.db(process.env.MONGO_DATABASE);       		// get database
    const collection = db.collection(process.env.MONGO_COLLECTION_USERS);  	// get collection

    const checkEmailInUse = collection.findOne({email:credentials.email})   // Check to see fi email is in use
    const passwordHash = generateHash(credentials.password)  				// generates a password hash
    	
    // Perform all async tasks concurrently. Quicker response time than doing them in series. 
    return Promise.all([checkEmailInUse, passwordHash]).then(([checkEmailInUse, passwordHash]) => {

    	const isEmailInUse = !!checkEmailInUse;

    	// If email is, infact, in use, return this error to the user 
    	if (isEmailInUse) return ({type:"email", message:"Email already in use", code:400})



    	// If there is an error inserting to database, return error, otherwise, return account created successfully message
    	else return addToDatabase(credentials, passwordHash, collection)
    				.then(data => {console.log(data.result); return ({type:"general", message:"Account successfully created!", code:200})})
    				.catch(err => ({type:"general", message:"something went wrong", code:400}))
    })
} 


const addToDatabase = (credentials, passwordHash, collection) => {

	// New entry for mongo user database
	const newUserObject = {
		email:credentials.email,
		username:credentials.username,
		passwordHash:passwordHash,
		going:[]
	}

	// upsert and $setOnInsert to make sure no duplicates, incase 2 people try to make an account with the same email at the same time, only one will be created, the other will be ignored. 
	return collection.update({email:credentials.email},{$setOnInsert: newUserObject}, {upsert:true})

}

export default Signup