import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(helmet());
app.disable('x-powered-by');
dotenv.config();

app.use(bodyParser.json());


app.post('/api/search', (req, res) => {
	console.log("received")
	res.status(200).json({results:[
			{name:"test", id:"example123", going:5, description:"best bar in the uk", imageURL:"imgur.com"},
			{name:"test1", id:"example1234", going:2, description:"second best bar in the uk", imageURL:"imgur.com"},
			{name:"test2", id:"example12345", going:15, description:"best bar in london", imageURL:"imgur.com"}
		]
	})
});

app.get('*', (req, res) => {
	res.send("homepage")
});


app.listen(process.env.PORT || 80, () => console.log("Running on port " + process.env.PORT))


