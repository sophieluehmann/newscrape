var mongoose = require("mongoose");

var Schema = mongoose.Schema;



var NoteSchema = new Schema({
    text: {
        type: String,
        require: true,
        useCreateIndex: true
    }, 
    article: 
    { type: Schema.ObjectId, ref: 'Article' }
});

var Note = mongoose.model("Note", NoteSchema);


module.exports = Note;