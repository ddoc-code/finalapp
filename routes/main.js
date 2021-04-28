module.exports = function(app)
{

	//redirectLogin function
	const redirectLogin = (req, res, next) => {
		if (!req.session.userId ) {
			res.redirect('./login')
		} else { next (); }
	}

	//validator function
	const { check, validationResult } = require('express-validator');

	//homepage route
	app.get('/', function(req,res){
		res.render('index.html')
	});

	//about page route
	app.get('/about', function(req,res){
		res.render('about.html');
	});

	//register page route
	app.get('/register', function(req,res){
		res.render('register.html');
	});

	//registered route
	//includes form validation
	app.post('/registered', [check('firstname').isLength({ min:1 }), check('firstname').isAlpha(),
				check('lastname').isLength({ min:1 }), check('lastname').isAlpha(),
				check('email').isLength({ min:1 }), check('email').isEmail(),
				check('username').isLength({ min:4 }), check('username').isAlphanumeric(),
				check('password').isLength({ min:7 })], function(req,res){

	//redirect to register if validation fails
	const errors = validationResult(req);
	if (!errors.isEmpty()) {res.redirect('./register');}
	else {

		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//bcrypt code - used for password hashing
		const bcrypt = require('bcrypt');
		const saltRounds = 10;
		const plainPassword = req.body.password;

		//password hashing function
		bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {

			//function to write to DB
			MongoClient.connect(url, function(err, client) {
				if (err) throw err;
				var db = client.db ('finalappDB');
				db.collection('users').insertOne({
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					username: req.body.username,
					password: hashedPassword
				});
				client.close();

				//confirmation message
				res.send('User "' + req.body.username + '" was added to the database.' + '<br/>' +
				'First Name: ' + req.body.firstname + '<br/>' +
				'Last Name: ' + req.body.lastname + '<br/>' +
				'Email Address: ' + req.body.email + '<br/>' +
				'Username: ' + req.body.username + '<br/>' +
				'<a href='+'./'+'>Home</a>');
			});
		});

	} //close validator else block
	});

	//login route
	app.get('/login', function(req,res){
		res.render('login.html');
	});

	//loggedin route
	app.post('/loggedin', function(req,res){
		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';
		
		//username var
		let user = req.body.username;

		//bcrypt code - used for password hashing
		const bcrypt = require('bcrypt');
		const saltRounds = 10;
		const plainPassword = req.body.password;

		//query DB to find user's hashed password
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('users').find({ username: user }).toArray((findErr, results) => {
				if (findErr) throw findErr;
				else
				try {
					//compare passwords
					bcrypt.compare(plainPassword, results[0].password, function(err, result) {
						if (result == true)
						{
						//save user session here upon successful login
						req.session.userId = req.body.username;
						res.send('Successfully logged in as ' + user + '<br/>' + '<a href='+'./'+'>Home</a>'); //successful login
						}
						else
						res.send('Failed to log in - incorrect password' + '<br/>' + '<a href='+'./'+'>Home</a>'); //incorrect password
					});
				} catch (err) {res.send('Failed to log in - incorrect username' + '<br/>' + '<a href='+'./'+'>Home</a>');} //incorrect username
			});
		});
	});

	//logout route
	app.get('/logout', redirectLogin, (req,res) => {
		req.session.destroy(err => {
			if (err) {
				return res.redirect('./')
			}
			//confirmation message
			res.send('You are now logged out.' + '<br/>' + '<a href='+'./'+'>Home</a>');
		});
	});

	//addfood route
	//this route is only available to logged in users
	app.get('/addfood', redirectLogin, function(req,res){
		res.render('addfood.html');
	});

	//foodadded route
	//includes form validation
	app.post('/foodadded', [check('name').isLength({ min:1 }), check('name').isAlpha(),
				check('value').isLength({ min:1 }), check('value').isNumeric(),
				check('unit').isLength({ min:1 }), check('unit').isAlpha(),
				check('calories').isLength({ min:1 }), check('calories').isNumeric(),
				check('carbs').isLength({ min:1 }), check('carbs').isNumeric(),
				check('fat').isLength({ min:1 }), check('fat').isNumeric(),
				check('protein').isLength({ min:1 }), check('protein').isNumeric(),
				check('salt').isLength({ min:1 }), check('salt').isNumeric(),
				check('sugar').isLength({ min:1 }), check('sugar').isNumeric()
				], function(req,res){

	//redirect to addfood if validation fails
	const errors = validationResult(req);
	if (!errors.isEmpty()) {res.redirect('./addfood'); }
	else {

		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//function to write to DB
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('food').insertOne({
				name: req.body.name,
				value: req.body.value,
				unit: req.body.unit,
				calories: req.body.calories,
				carbs: req.body.carbs,
				fat: req.body.fat,
				protein: req.body.protein,
				salt: req.body.salt,
				sugar: req.body.sugar,
				user: req.session.userId
			});
			client.close();

			//confirmation message
			res.send('Name: ' + req.body.name + '<br/>' +
				'Value: ' + req.body.value + '<br/>' +
				'Unit: ' + req.body.unit + '<br/>' +
				'Calories: ' + req.body.calories + '<br/>' +
				'Carbs: ' + req.body.carbs + '<br/>' +
				'Fat: ' + req.body.fat + '<br/>' +
				'Protein: ' + req.body.protein + '<br/>' +
				'Salt: ' + req.body.salt + '<br/>' +
				'Sugar: ' + req.body.sugar + '<br/>' +
				'This item was added to the database.' +
				'<br/>' + '<a href='+'./'+'>Home</a>');
		});

	} //close validator else block
	});

	//search route
	app.get('/search', function(req,res){
		res.render('search.html');
	});

	//search-results route
	app.get('/search-results', function(req,res){
		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//search term var
		let keyword = req.query.search;

		//function to query database
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('food').find({ name: new RegExp(keyword) }).toArray((findErr, results) => {
				if (findErr) throw findErr;
				else
				res.render('searchlist.ejs', {foodsearch:results});
				client.close();
			});
		});
	});

	//update route
	//this route is only available to logged in users
	app.get('/update', redirectLogin, function(req,res){
		res.render('update.ejs', {foodupdate:null, searched:false}); //foodupdate begins as null
	});

	//updating route
	app.get('/updating', function(req,res){
		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//save session ID
		var userID = req.session.userId;

		//search term var
		let keyword = req.query.search;

		//function to query database
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('food').find({ name: new RegExp(keyword) }).toArray((findErr, results) => {
				if (findErr) throw findErr;
				else
				res.render('update.ejs', {foodupdate:results[0], user:userID, searched:true}); //if the food is found foodupdate contains a record to be displayed
				client.close();
			});
		});
	});

	//updated route
	//includes form validation
	app.post('/updated', [check('name').isLength({ min:1 }), check('name').isAlpha(),
				check('value').isLength({ min:1 }), check('value').isNumeric(),
				check('unit').isLength({ min:1 }), check('unit').isAlpha(),
				check('calories').isLength({ min:1 }), check('calories').isNumeric(),
				check('carbs').isLength({ min:1 }), check('carbs').isNumeric(),
				check('fat').isLength({ min:1 }), check('fat').isNumeric(),
				check('protein').isLength({ min:1 }), check('protein').isNumeric(),
				check('salt').isLength({ min:1 }), check('salt').isNumeric(),
				check('sugar').isLength({ min:1 }), check('sugar').isNumeric()
				], function(req,res){

	//redirect to update if validation fails
	const errors = validationResult(req);
	if (!errors.isEmpty()) {res.redirect('./update'); }
	else {

		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//id of record to update
		var ObjectID = require('mongodb').ObjectID;
		let DBid = ObjectID(req.body.DBid);

		//function to update DB
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('food').updateOne({ _id: DBid },{
				$set: {
					name: req.body.name,
					value: req.body.value,
					unit: req.body.unit,
					calories: req.body.calories,
					carbs: req.body.carbs,
					fat: req.body.fat,
					protein: req.body.protein,
					salt: req.body.salt,
					sugar: req.body.sugar
				}
			});
			client.close();

			//confirmation message
			res.send('Name: ' + req.body.name + '<br/>' +
				'Value: ' + req.body.value + '<br/>' +
				'Unit: ' + req.body.unit + '<br/>' +
				'Calories: ' + req.body.calories + '<br/>' +
				'Carbs: ' + req.body.carbs + '<br/>' +
				'Fat: ' + req.body.fat + '<br/>' +
				'Protein: ' + req.body.protein + '<br/>' +
				'Salt: ' + req.body.salt + '<br/>' +
				'Sugar: ' + req.body.sugar + '<br/>' +
				'This item was updated.' + '<br/>' +
				'<a href='+'./'+'>Home</a>');
		});

	} //close validator else block
	});

	//deleted route
	app.post('/deleted', function(req,res){
		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//id of record to delete
		var ObjectID = require('mongodb').ObjectID;
		let DBid = ObjectID(req.body.DBid);

		//function to delete from DB
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('food').deleteOne({ _id: DBid });
			client.close();

			//confirmation message
			res.send('Deleted item "' + req.body.name + '"' + '<br/>' + '<a href='+'./'+'>Home</a>');
		});
	});

	//listfood route
	app.get('/listfood', function(req,res){
		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//function to query database
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('food').find().toArray((findErr, results) => {
				if (findErr) throw findErr;
				else
				res.render('foodlist.ejs', {foodlist:results});
				client.close();
			});
		});
	});

	//api route
	app.get('/api', function(req,res){
		//mongo vars
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost';

		//function to query database
		MongoClient.connect(url, function(err, client) {
			if (err) throw err;
			var db = client.db ('finalappDB');
			db.collection('food').find().toArray((findErr, results) => {
				if (findErr) throw findErr;
				else
				res.json(results);
				client.close();
			});
		});
	});
}
