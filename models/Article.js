var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var ArticleSchema = new Schema({
    title: {
        type: String,
        require: true,
        useCreateIndex: true
    },
    link: {
        type: String,
        require: true,
        useCreateIndex: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{ type: Schema.ObjectId
        , ref: 'Note' }]
    
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;