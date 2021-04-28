DATA & THE WEB FINAL APP

Welcome to my final app for this module. I have fulfilled almost every requirement and I believe my web application works very well. I am particularly pleased with my update.ejs page, which handles interactions with 4 different routes in one pageview using EJS. Please find below the full list of requirements, including where I have implemented each one, and my comments.

REQUIREMENT LIST

R1: HOME PAGE ///////////////////////////////////////////////

R1A: The name of my web application is displayed on the homepage.
Implemented at: "views/index.html", line 15.

R1B: A navigation bar is implemented on the homepage.
Implemented at: "views/index.html", lines 17 to 30.

R2: ABOUT PAGE ///////////////////////////////////////////////

R2A: Information about the web application (including developer name) is displayed on the about page.
Implemented at: "views/about.html", lines 32 to 38.

R2A: A navigation bar is implemented on the about page.
Implemented at: "views/about.html", lines 17 to 30.

R3: REGISTER PAGE ///////////////////////////////////////////////

R3A: A form is implemented on the register page. All five fields are included.
Implemented at: "views/register.html", lines 42 to 59.

R3A: A navigation bar is implemented on the register page.
Implemented at: "views/register.html", lines 17 to 30.

R3B: Form data is stored in the database. All five fields are included.
Implemented at: "routes/main.js", lines 55 to 65.

R3B: For security, a hashed password is stored, not a plain password.
Implemented at: "routes/main.js", line 63.

R3C: A confirmation message is displayed after the details have been added.
Implemented at: "routes/main.js", lines 68 to 73.

R4: LOGIN PAGE ///////////////////////////////////////////////

R4A: A form is implemented on the login page. Both fields are present.
Implemented at: "views/login.html", lines 34 to 42.

R4A: A navigation bar is implemented on the login page.
Implemented at: "views/login.html", lines 17 to 30.

R4B: Form data is checked against registered user data in the database.
Implemented at: "routes/main.js", lines 100 to 108.

R4B: Users are logged in only if both username and password are correct.
Implemented at: "routes/main.js", lines 109 to 114.

R4C: A message is displayed indicating if login was successful. If not successful, the reason is given.
Implemented at: "routes/main.js", lines 113 to 118.

R5: LOGOUT ///////////////////////////////////////////////

R5A: A logout route is implemented. A confirmation message is displayed on logout.
Implemented at: "routes/main.js", lines 124 to 130.

R6: ADD FOOD PAGE ///////////////////////////////////////////////

R6A: A form is implemented on the add food page. All required fields are included.
Implemented at: "views/addfood.html", lines 42 to 71.

R6A: A navigation bar is implemented on the add food page.
Implemented at: "views/addfood.html", lines 17 to 30.

R6B: Form data is stored in the database. All required fields are included.
Implemented at: "routes/main.js", lines 163 to 178.

R6B: The username of the user who has added this food item is also stored.
Implemented at: "routes/main.js", line 176.

R6C: A confirmation message is displayed after the details have been added.
Implemented at: "routes/main.js", lines 181 to 191.

R7: SEARCH FOOD PAGE ///////////////////////////////////////////////

R7A: A form is implemented on the search page. Only the Name field is included.
Implemented at: "views/search.html", lines 34 to 39.

R7A: A navigation bar is implemented on the search page.
Implemented at: "views/search.html", lines 17 to 30.

R7B: The database is searched based on the food name collected from the form.
Implemented at: "routes/main.js", lines 209 to 219.

R7B: If the food is found, searchlist.ejs is rendered.
Implemented at: "routes/main.js", line 218.

R7B: The food data is displayed in a table in searchlist.ejs.
Implemented at: "views/searchlist.ejs", lines 32 to 76.

R7B: If the food is not found, a message is displayed to the user.
Implemented at: "views/searchlist.ejs", line 51.

R7C: A regular expression is used to search for food items that partially match the Name input, as well as whole matches.
Implemented at: "routes/main.js", line 215.

R8: UPDATE FOOD PAGE ///////////////////////////////////////////////

R8A: A search form is implemented on the update page. Only the Name field is included.
Implemented at "views/update.ejs", lines 34 to 39.

R8A: A navigation bar is implemented on the update page.
Implemented at "views/update.ejs", lines 17 to 30.

R8B: If the food is found, update.ejs is rendered with the database record found.
Implemented at: "routes/main.js", line 243 to 249.

R8B: The food data is displayed in a table in update.ejs.
Implemented at: "views/update.ejs", lines 41 to 87.

R8B: If the food is not found, a message is displayed to the user.
Implemented at: "views/update.ejs", lines 58 to 60.

R8B: Updated food data is collected in a form in update.ejs.
Implemented at: "views/update.ejs", lines 104 to 134.

R8B: The food item is updated in the database.
Implemented at "routes/main.js", lines 282 to 298.

R8B: A confirmation message is displayed after the details have been updated.
Implemented at "routes/main.js", lines 301 to 311.

R8B: Only the user who created the food item can update or delete it.
Implemented at: "views/update.ejs", lines 90 to 94.

R8C: A delete button is implemented on the update page.
Implemented at: "views/update.ejs", lines 138 to 142.

R8C: After clicking the button, the user must confirm they want to delete the item.
Implemented at: "views/update.ejs", line 138

R8C: The item is deleted from the database.
Implemented at "routes/main.js", lines 328 to 332.

R8C: A confirmation message is displayed after the item has been deleted.
Implemented at "routes/main.js", line 335.

R8C: Only the user who created the food item can update or delete it.
Implemented at: "views/update.ejs", lines 90 to 136.

R9: LIST FOOD PAGE ///////////////////////////////////////////////

R9A: foodlist.ejs is rendered with all database records.
Implemented at "routes/main.js", lines 346 to 353.

R9A: A navigation bar is implemented on the food list page.
Implemented at: "views/foodlist.ejs", lines 17 to 30.

R9B: All database items are presented in a table in foodlist.ejs.
Implemented at: "views/foodlist.ejs", lines 32 to 76.

R9C: This requirement is not implemented in my application.
Not implemented.

R10: API ///////////////////////////////////////////////

A basic API is implemented on the /api route.
Implemented at "routes/main.js", lines 359 to 372.

My API does not implement get, post, push or delete.

R11: FORM VALIDATION ///////////////////////////////////////////////

All forms that save data to the database are extensively validated, including confirmation that all fields are filled, length requirements are met, correct data types are provided, and email addresses are of the correct format.

Data from the register.html form is validated thoroughly.
Implemented at "routes/main.js", lines 31 to 40.

Data from the addfood.html form is validated thoroughly.
Implemented at "routes/main.js", lines 142 to 156.

Data from the update.ejs form is validated thoroughly.
Implemented at "routes/main.js", lines 257 to 271.

R12: ///////////////////////////////////////////////

My web application is implemented in Node.js on my virtual server. The back-end database is implemented using MongoDB (please see below for more information). My code is well commented.

As I have used MongoDB for my back-end database, I will descibe my data model here.

For this project I created a new MongoDB database, called "finalappDB".
This database contains two collections, "food" and "users".

The "food" collection stores food records. Each food record has 11 fields.
These are: "_id", "name", "value", "unit", "calories", "carbs", "fat", "protein", "salt", "sugar", and "user". Most of these are self explanatory. "_id" stores the ObjectID of the record, and "user" stores the username of the user that added the item.

The "users" collection stores user records. Each user record has 6 fields.
These are: "_id", "firstname", "lastname", "email", "username", and "password". These are also mostly self explanatory. As before, "_id" stores the ObjectID of the record. Please note that "password" only stores hashed passwords. Plain passwords are not stored in the database.
