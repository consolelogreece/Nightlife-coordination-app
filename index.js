import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer'

import { search } from './app/search'
import Signup from './auth/Signup'
import Signin from './auth/signin'
import Changepassword from './auth/Changepassword'
import Resetpassword from './auth/ResetPassword'
import Resetpasswordrequestemail from './auth/Resetpasswordrequestemail'

import going, { getGoing } from './app/going'

import mongoClient from 'mongodb'

let db;
const app = express();

app.use(helmet());
dotenv.config();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client", "build")))

//create database object
mongoClient.connect(process.env.MONGO_URL, (err, database) => {
	if (err) throw err;

	db = database;
});


let smtpConfig = {
    host: process.env.SMTP_SERVER_NAME,
    port: process.env.SMTP_SERVER_PORT,
    connectionTimeout:3000,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
};




let transporter = nodemailer.createTransport(smtpConfig)




//Note to self: DISABLE THE AWAIT ON WRITING TO DB. THIS MAKES RESPONSE TAKE LONGER. INSTEAD, JUST RETURN AN ERROR IF THE USER TRIES TO 'GO' TOO SOON AFTER THE DB INSERTS A NEW ENTRY.

app.get('/api/search/*', (req, res) => {
	search(db, req.query.request).then(data => res.json(data))
								.catch(err => {
									console.log(err)
									res.status(400).json({type:"general", message:"Something went wrong"})
								})
});






app.post("/api/going", (req, res) => {
	going(req, db).then(response => {
							res.status(response.code).json({type:response.type, message:response.message, setStatus:response.setStatus, errors:response.errors, businessId:response.businessId})
					   })
					  .catch(err => {
					  		console.log(err)
							res.status(400).json({type:"general", message:"Something went wrong"})
					  })
});






app.post("/api/getGoing", (req, res) => {
	getGoing(req, db).then(response => {
							res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors, })
					   })
					  .catch(err => {
					  		console.log("error: ",err)
							res.status(400).json({type:"general", message:"Something went wrong"})
					  })
});









app.post("/api/auth/signin", (req, res) => {
	Signin(req, db).then(response => {
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


app.post('/api/auth/changepassword', (req, res) => {
	Changepassword(req, db).then(response => {
		res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
	})
	.catch(err => {
		console.log(err)
		res.status(400).json({type:'general', message:'something went wrong', data:null})
	})
})


app.post('/api/auth/resetpasswordrequestemail', (req, res) => {
	 Resetpasswordrequestemail(req, db, transporter).then(response => {
		res.status(200).end()
	})
	.catch(err => {
		console.log(err)
		res.status(400).end()
	})
})

app.post('/api/auth/resetpassword', (req, res) => {
	 Resetpassword(req, db).then(response => {
		res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
	})
	.catch(err => {
		console.log(err)
		if (err.name === "TokenExpiredError") {
			res.status(400).json({type:'token', message:'Token expired, please request another.', data:null})
		} else {
			res.status(400).json({type:'general', message:'something went wrong', data:null})
		}
		
		
	})
})


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});


app.listen(process.env.PORT || 80, () => console.log("Running on port " + process.env.PORT))





