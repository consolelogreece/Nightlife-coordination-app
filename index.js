import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { search } from './app/search'

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
									res.status(400).json({error: "Something went wrong"})
								})
});



app.get('*', (req, res) => {
	res.send("homepage")
});






