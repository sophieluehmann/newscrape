var cheerio = require("cheerio");
var express = require("express");
var axios = require("axios");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var Article = require("./models/Article.js");
var Note = require("./models/Note.js")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1:password1@ds155864.mlab.com:55864/heroku_298hmhcd";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
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
       
        var news = {
          Article: data,
        };
        //res.send(news);

        res.render("index", news);
      }
    });
});

app.post("/save", function(req, res) {  
 
  Article.findOneAndUpdate({ link: req.body.link }, { saved: true })
  .then(function(result) {
    console.log(result);
    alert("Article saved!")
  })
  .catch(function(err) {
    console.log("err:" + err);
  });
});

app.post("/remove", function(req, res) {  
 
  Article.findOneAndUpdate({ link: req.body.link }, { saved: false })
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.log("err:" + err);
  });
});




app.get("/saved", function (req, res) {
  Article.find({ saved: true })
    .exec(function (error, data) {
      if (error) {
        res.send(error);
      }
      else {
        var saved = {
          Article: data
        };

        res.render("saved", saved);
     
      }
    });
    
});


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
    
      res.redirect("/");

    });

    
    
  });

  app.post("/note", function(req, res) {  
  
    var newNote = new Note(req.body);
    newNote.save(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
      
        Article.findByIdAndUpdate({ _id: doc.article }, {$set: {notes: doc._id}})
        .then(function(result) {
          console.log(result);
        })
        .catch(function(err) {
          console.log("err:" + err);
        });
        
      }
    });
     
  });
    
  app.get("/savedNotes", function (req, res) {
    
    // temp id 
    var id = "5d3bbc1a2a1933abbbf35b44";
   
   // gets the id of the article but in an object
    console.log(req.query);
    Article
    .findById({ _id: id })
    .populate('notes')
    .exec(function(err, result){
      if (err) {
        console.log(err);
      } else {
        var data = result.notes;
        var note = data[0].text;
        res.render('saved', {note})
      }
    })
      
  });
  

app.listen(3000, function() {
    console.log("app runnin on 3000");
});