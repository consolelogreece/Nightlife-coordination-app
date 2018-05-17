import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { search } from './app/search'
import Signup from './auth/Signup'
import Signin from './auth/signin'


import mongoClient from 'mongodb'

let db;
const app = express();


app.use(helmet());
app.disable('x-powered-by');
dotenv.config();
app.use(bodyParser.json());


mongoClient.connect(process.env.MONGO_URL, (err, database) => {
	if (err) throw err;
	console.log("true");

	db = database;
	app.listen(process.env.PORT || 80, () => console.log("Running on port " + process.env.PORT))
});

//Note to self: DISABLE THE AWAIT ON WRITING TO DB. THIS MAKES RESPONSE TAKE LONGER. INSTEAD, JUST RETURN AN ERROR IF THE USER TRIES TO 'GO' TOO SOON AFTER THE DB INSERTS A NEW ENTRY.

app.get('/api/search/*', (req, res) => {
	search(db, req.query.request).then(data => res.json(data))
								.catch(err => {
									console.log(err)
									res.status(400).json({type:"general", message:"Something went wrong"})
								})
});



app.post("/api/auth/signin", (req, res) => {
	Signin(req, db).then(response => {
		console.log(response)
		res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
	}).catch(err => {
	 	// in case of unhandled error, return generic error message
		console.log(err)
		res.status(400).json({type:'general', message:'something went wrong', data:null})
	}) 

});


app.post("/api/auth/signup", (req, res) => {
	Signup(req, db).then(response => {

						// create response based on the data returned by Signup function.
						res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
					})
				   .catch(err => {
				   		console.log("==================", err);
				   		// incase of unhandled error, return general error.
				   		res.status(400).json({type:"general", message:"Something went wrong"}
				   	)})
					
});


app.get('*', (req, res) => {
	res.send("homepage")
});






