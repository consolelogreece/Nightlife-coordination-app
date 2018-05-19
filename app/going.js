import { verifyJWT } from '../auth/authentication'

const going = async (req, databaseObject) => {

	const { businessId, token } = req.body.request

	if (!businessId) return Promise.reject(null)

	const checkValidAndGetData = await verifyJWT(token)
	if (!checkValidAndGetData) {
		return({type:"general", message:"You are not authorized to perform this action", code:400, setStatus:null, data:null, errors:{general:"Not authorized"}})
	}

	const db = databaseObject.db(process.env.MONGO_DATABASE);       					// get database
    const userCollection = db.collection(process.env.MONGO_COLLECTION_USERS);  			// get user collection
    const businessCollection = db.collection(process.env.MONGO_COLLECTION_LOCATIONS);  	// get business collection

    const userEmail = checkValidAndGetData.email
  
	let userDoc = await userCollection.findOne({email:userEmail})

	let userGoing = userDoc.going
	
	if (userGoing.includes(businessId)) return setNotGoing(businessCollection, userCollection, businessId, userEmail)
	else return setGoing(businessCollection, userCollection, businessId, userEmail)
	
}


export default going



export const getGoing = async (request, databaseObject) => {
	
	const token = request.body.request

	const checkValidAndGetData = await verifyJWT(token)

	if (checkValidAndGetData) {
		
		{ // explicit block for more obvious scoping
			const userEmail = checkValidAndGetData.email
			const db = databaseObject.db(process.env.MONGO_DATABASE);       					// get database
    		const userCollection = db.collection(process.env.MONGO_COLLECTION_USERS);  			// get user collection
    		let userDoc = await userCollection.findOne({email:userEmail})
    		return {type:"general", message:"Successfully requested 'going' list", code:200, data:userDoc.going, errors:null}
    	}
    	
	}

	return({type:"general", message:"You are not authorized to perform this action", code:400, data:null, errors:{general:"Not authorized"}})

}



const setGoing = (businessCollection, userCollection, businessId, userEmail) => {

	let insertIntoBusinessCollection = businessCollection.update({businessId:businessId}, {$inc:{businessGoers:1}})
	let insertIntoUserCollection = userCollection.update({email:userEmail}, {$addToSet:{going:businessId}})

	return Promise.all([insertIntoUserCollection, insertIntoUserCollection]).then(values => {
		return {type:"general", message:"Successfully set going to event", code:200, setStatus:"going", data:null, errors:null, businessId:businessId}
	})	

}



const setNotGoing = (businessCollection, userCollection, businessId, userEmail) => {

	let insertIntoBusinessCollection = businessCollection.update({businessId:businessId}, {$inc:{businessGoers:-1}})
	let insertIntoUserCollection = userCollection.update({email:userEmail}, {$pull:{going:{$in:[businessId]}}})

	return Promise.all([insertIntoUserCollection, insertIntoUserCollection]).then(values => {
		return {type:"general", message:"Successfully cancelled going to event", code:200, setStatus:"notGoing", errors:null, data:null, businessId:businessId}
	})	

}






