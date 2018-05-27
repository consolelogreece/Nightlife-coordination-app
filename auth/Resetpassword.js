import { generateJWTWithExpiration } from './authentication'
const ResetPassword = async (req, databaseObject, transporterObject) => {

	console.log(req.body)
	//need to set up emailing still using nodemailer. still set to {} in index
	let userEmail = req.body.credentials.email

	const db = databaseObject.db(process.env.MONGO_DATABASE);       		// get database
    const collection = db.collection(process.env.MONGO_COLLECTION_USERS);  	// get collection

	let userData = await collection.findOne({email:userEmail}) // check if email exists

	if (!userData) return

	const resetHash = await generateJWTWithExpiration(userEmail, "1h")

	await collection.updateOne({email:userEmail}, {$set:{resetHash:resetHash}})

	//send reset link
	
	return true

	
}

export default ResetPassword


/*

 if email exists, create token, store in db, and send token, in a url, via email.
 when the user clicks on the reset link, with the token in the url, they're taken to a password reset screen (pass/confirm pass).
 on submission of new password. if the token matches the token in the db, the password is set as the submitted pass

*/