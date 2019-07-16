var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TestSchema = new Schema({
    title: {
        type: String,
        require: true
    }
});

var Article = mongoose.model("Article", TestSchema);

module.exports = Article;