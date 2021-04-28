//import express
var express = require ('express')
//import bodyparser
var bodyParser= require ('body-parser')
//import express-session module
var session = require ('express-session');
//import express-validator
var validator = require ('express-validator');
//import path - this is used for linking CSS
var path = require('path');

//express variables
const app = express()
const port = 8000

//use bodyparser
app.use(bodyParser.urlencoded({ extended: true }))

//use session management
app.use(session({
	secret: 'somerandomstuffs',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000
	}
}));

//use path to connect to public folder for CSS
app.use(express.static(path.join(__dirname, 'public')));

//import MongoDB module
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/finalappDB";
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("Database created!");
	db.close();
});

//express web server code
require('./routes/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//////////////

//run the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
