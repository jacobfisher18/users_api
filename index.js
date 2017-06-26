const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require('./routes/api.js');

const app = express();

//conect to MongoDB
mongoose.connect("mongodb://localhost/usergo"); //use db usergo
mongoose.Promise = global.Promise; //mogoose's Promise object is deprecated; use global Promise instead

//to serve static files (i.e. front-end), uses the public folder
app.use(express.static('public'));

app.use(bodyParser.json()); //gives us access to req.body

app.use('/api', routes);

app.listen(process.env.port || 3001, () => {
    console.log("listening on port 3001");
});