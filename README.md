# RESTful-API-Intro
This project is a personal exploration of RESTful APIs using Node.js and Mongoose. It includes CRUD (Create, Read, Update, Delete) functionality for a variety of resources

## Prerequisites
* MongoDB
* Postman

## Download the dependencies used in this project
Type in the terminal:
```bash
npm i
```

## Run your local server
Type in the terminal:
```bash
nodemon app.js
```

## Try it yourself (with Postman)
* Fetch all articles: <strong>GET</strong>
```bash
localhost:8080/articles
```

* Post one articles: <strong>POST</strong>\
In the <em>Body</em> section you will be able to enter the necessary information
```bash
localhost:8080/articles
```
* Delete all articles: <strong>DELETE</strong>
```bash
localhost:8080/articles
```

* Fetch an specific article: <strong>GET</strong>
```bash
localhost:8080/articles/:articleTitle
```
* Update an specific article: <strong>UPDATE</strong>
```bash
localhost:8080/articles/:articleTitle
```
* Patch an specific article: <strong>PATCH</strong>
```bash
localhost:8080/articles/:articleTitle
```
* Delete an specific article: <strong>DELETE</strong>
```bash
localhost:8080/articles/:articleTitle
```
