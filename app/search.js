import testResults from './testResults'

import axios from 'axios'

export const search = async (databaseObject, request) => {


	let apiResults = await searchAPI(request)

	let apiResultIdArray = apiResults.map(result => result.businessId)

	let query = await queryDatabase(databaseObject, apiResultIdArray)

	let idsFromDb = query.map(business => business.businessId)

	let existsArrays = getExistsArrays(apiResultIdArray, idsFromDb)

	let arrayOfDataObjects = createArrayOfObjectsForDbInsertion(existsArrays.notInDb);

	if (arrayOfDataObjects.length !== 0) await insertIntoDb(databaseObject, arrayOfDataObjects)

	let finalSearchData = generateFinalSearchData(query, idsFromDb, apiResults )

	return finalSearchData


}


export const searchAPI = async (request) => {

	const results = await axios.get(`https://api.yelp.com/v3/businesses/search?term=pubs+bars+restaurant&location=${request}`,{headers: {Authorization: `Bearer ${process.env.YELP_API_KEY}`}})

	let businessArray = [];
	results.data.businesses.forEach(business => {
		businessArray.push({
			businessId: business.id,
			businessName: business.name,
			businessUrl: business.url,
			businessRating:business.rating,
			businessImageUrl:business.image_url,
			businessGoers:0
		})
	});


	return businessArray

}



export const queryDatabase = async (databaseObject, apiResultIdArray) => {
	const db = databaseObject.db(process.env.MONGO_DATABASE);       			// get database
    const collection = db.collection(process.env.MONGO_COLLECTION_LOCATIONS);  	// get collection

	let results = await collection.find({businessId: {$in:apiResultIdArray}}).toArray()

	return results

  
}




export const getExistsArrays = (apiResultIdArray, idsFromDb) => {

	let inDb = [], notInDb = [];

   	apiResultIdArray.forEach(id => {
		if (idsFromDb.includes(id)) inDb.push(id)
	 	else notInDb.push(id)
	 });

	 return {inDb:inDb, notInDb:notInDb}

}



export const createArrayOfObjectsForDbInsertion = (ids) => {
	let array = ids.map(id => {
		return {businessId: id, businessGoers:0}
	})

	return array
} 



export const insertIntoDb = async (databaseObject, arrayOfDataObjects) => {

	const db = databaseObject.db(process.env.MONGO_DATABASE);       			// get database
    const collection = db.collection(process.env.MONGO_COLLECTION_LOCATIONS);  	// get collection

 	try {

    	await collection.insertMany(arrayOfDataObjects)

    	return true

    } catch (err) {
    	throw err
    }


}


export const generateFinalSearchData = (dataFromDb, idsFromDb, apiResults) => {

	let finalDataArray = [];

	let Id, businessGoers;

	apiResults.forEach((result) => {

		Id = result.businessId

		if (idsFromDb.includes(Id)) {

			businessGoers = (dataFromDb.find(res => res.businessId === Id)).businessGoers

			finalDataArray.push({businessId: result.businessId,businessName: result.businessName,businessUrl: result.businessUrl, businessRating:result.businessRating, businessImageUrl:result.businessImageUrl, businessGoers:businessGoers})
	

		} else {

			finalDataArray.push(result)

		}

	});

	return finalDataArray;

}