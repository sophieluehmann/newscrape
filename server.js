var cheerio = require("cheerio");
var express = require("express");
var axios = require("axios");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars');

var Article = require("./models/Article.js");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1:password1@ds155864.mlab.com:55864/heroku_298hmhcd";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var db = mongoose.connection;

db.once("open", function() {
	console.log("Mongoose connection successful.");
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

  app.get("/scrape", function(req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://news.sky.com/strangenews").then(function(response) {
      var $ = cheerio.load(response.data);
      $(".sdc-site-tile__body-main").each(function(i, element) {

        var result = {};

        result.title = $("body > div.sdc-site-tiles > div > div > div:nth-child(" + i + ") > div > div > h3 > a > span").text();
        
        if (result.title) {
        var newArticle = new Article(result);

        newArticle.save(function(err, inserted) {
          if (err) {
            console.log(err);
          } else {
            console.log(inserted);
          }
        });
      };
      });
    
     

    });
  
    

  
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });
  

app.listen(3000, function() {
    console.log("app runnin on 3000");
});