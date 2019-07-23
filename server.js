var cheerio = require("cheerio");
var express = require("express");
var axios = require("axios");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var exphbs  = require('express-handlebars');

var Article = require("./models/Article.js");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1:password1@ds155864.mlab.com:55864/heroku_298hmhcd";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.use(methodOverride('_method'));


app.set('views', __dirname + '/views');
app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: __dirname + "/views/layouts" }));
app.set("view engine", "handlebars");

var db = mongoose.connection;

db.once("open", function() {
	console.log("Mongoose connection successful.");
});



app.get("/", function (req, res) {
  Article.find({})
    .exec(function (error, data) {
      if (error) {
        res.send(error);
      }
      else {
       var imgSrc = "StrangeNews.png"
        var news = {
          Article: data,
          imgSrc: imgSrc
        };
        //res.send(news);

        res.render("index", news);
      }
    });
});

app.post("/save", function(req, res) {
  
  Article.update({ link: req.body}, { saved: true });
  console.log("database updated");
 
});
/*app.post("/save", function(req, res) {
  console.log("req", req.body)
  
  res.redirect("/");
});*/



  app.get("/scrape", function(req, res) {
    axios.get("https://news.sky.com/strangenews").then(function(response) {
      var $ = cheerio.load(response.data);
      
      $(".sdc-site-tile__body-main").each(function(i, element) {

        var result = {};

        result.title = $("body > div.sdc-site-tiles > div > div > div:nth-child(" + i + ") > div > div > h3 > a > span").text();
        result.link = "https://news.sky.com/" +  $("body > div.sdc-site-tiles > div > div > div:nth-child(" + i + ") > div > div > h3 > a").attr("href");

        if (result.title && result.link) {
        var newArticle = new Article(result);

        newArticle.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        });
      };
       
      });
      /*$(".sdc-site-tile__body-main").each(function(i, element) {
        console.log(i);
        var result = {};
        
        result.title = $("#load-more-list > div > div > div > div:nth-child(" + i + ") > div > div > h3 > a > span").text();
        result.link = "https://news.sky.com/" +  $("#load-more-list > div > div > div > div:nth-child(" + i + ") > div > div > h3 > a > span").attr("href");

        if (result.title && result.link) {
        var newArticle = new Article(result);

        newArticle.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        });
      };
       
      });

    */
      res.redirect("/");

    });

    
    
  });
  

app.listen(3000, function() {
    console.log("app runnin on 3000");
});