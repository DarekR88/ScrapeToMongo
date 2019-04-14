const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models');

const PORT = process.env.PORT || 3000;

const app = express();

// Use morgan logger for logging requests
app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
// Connect to the Mongo DB

app.get('/all', function (req, res) {
    axios.get('http://www.nintendolife.com/').then(function (response) {
        const $ = cheerio.load(response.data);
        // let results = []
        $('li.item.item-content.item-article').each(function (i, element) {
            let result = {}
            result.image = $(element).find('img').attr('src')
            result.title = $(element).find('span.title').text()
            result.link = $(element).find('a.title').attr('href')
            result.description = $(element).find('p.description').text()
            result.favorited = false
            db.Article.create(result).then(function (dbArticle) {
                console.log(dbArticle);
            }).catch(function (err) {
                console.log(err);
            })
        })
        res.send('scrape complete')
    })
})

app.get('/articles', function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

app.post('/articles/:id', function (req, res) {
    let id = req.params.id
    db.Article.updateOne({ _id: id }, { $set: { favorited: true } }, function (error, edited) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(edited);
            res.send(edited);
        }
    })
})

app.get('/favorites', function (req, res) {
    db.Article.find({ favorited: true }).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
})

app.post('/remove/:id', function (req, res) {
    let id = req.params.id
    db.Article.updateOne({ _id: id }, { $set: { favorited: false } }, function (error, edited) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            console.log(edited);
            res.send(edited);
        }
    })
})

app.get('/article/:id', function (req, res) {
    let id = req.params.id
    db.Article.findOne({ _id: req.params.id })
        .populate('comment')
        .then(function (dbArticle) {
            console.log("YOU ARE HERE" + dbArticle);
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
})

app.post('/comments/:id', function (req, res) {
    db.Comment.create(req.body)
        .then(function (dbComment) {
            db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true })
                .then((dbArticle) => {
                    res.json(dbArticle);
                })
                .catch((err) => {
                    res.json(err);
                });
        })
        .catch(function (err) {
            res.json(err);
        })
})

app.delete('/cleanDb', function (req, res){
    db.Article.deleteMany({favorited: false}, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(null, data);
        }
      });
})

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});