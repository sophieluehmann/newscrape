var cheerio = require("cheerio");
var express = require("express");
var axios = requie("axios");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://<user1>:<password1>@ds155864.mlab.com:55864/heroku_298hmhcd";

mongoose.connect(MONGODB_URI);

var app = express();

app.get("/", function(req,res) {
    res.send("he;lwo wokrcd");
});

app.listen(3000, function() {
    console.log("app runnin on 3000");
});