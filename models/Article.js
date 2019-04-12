const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ArticleSchema = new Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    favorited: {
        type: Boolean,
        default: false
    },
    commentAdded: {
        type: Boolean,
        default: false
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

let Article = mongoose.model('Article', ArticleSchema)

module.exports = Article;