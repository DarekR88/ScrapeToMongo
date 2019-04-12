const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CommentSchema = new Schema({
    user: String,
    body: String
})
let Comment = mongoose.model('Note', CommentSchema);
module.exports = Comment;