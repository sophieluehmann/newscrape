var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true,
        dropUps: true,
        useCreateIndex: true
    },
    link: {
        type: String,
        require: true,
        unique: true,
        dropUps: true,
        useCreateIndex: true
    },
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;