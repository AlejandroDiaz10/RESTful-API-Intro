const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const port = 8080;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB")
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on -> localhost:${port}`);
        });
    })
    .catch(err => console.log(err));


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const Article = new mongoose.model("Article", articleSchema);

// --------------------------------------------------------------- Requests targetting all articles
app.route("/articles")
    // Fetches all articles
    .get(async (req, res) => {
        await Article.find({})
            .then(articles => res.send(articles))
            .catch(err => res.send(err));
    })
    // Post one article
    .post(async (req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });
        await newArticle.save()
            .then(() => res.send("Successfully added a new article"))
            .catch(err => res.send(err));
    })
    // Deletes all articles
    .delete(async (req, res) => {
        await Article.deleteMany({})
            .then(() => res.send("Successfully deleted all articles"))
            .catch(err => res.send(err));
    });


// --------------------------------------------------------------- Requests targetting an specific article
app.route("/articles/:articleTitle")
    .get(async (req, res) => {
        await Article.findOne({ title: req.params.articleTitle })
            .then(article => res.send(article))
            .catch(err => res.send(err));
    })
    .put(async (req, res) => { // PUT verbe is meant to update/overwrite the whole document
        await Article.findOneAndReplace({ title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content })
            .then(() => res.send("Successfully updated article (PUT)"))
            .catch(err => res.send(err));
    })
    .patch(async (req, res) => { // Patch, on the other hand, updates only what' necessary
        await Article.findOneAndUpdate({ title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content })
            .then(() => res.send("Successfully updated article (PATCH)"))
            .catch(err => res.send(err));
    })
    .delete(async (req, res) => {
        await Article.deleteOne({ title: req.params.articleTitle })
            .then(() => res.send("Successfully deleted article"))
            .catch(err => res.send(err));
    });
