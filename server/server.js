const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const morgan = require('morgan');
const Clarifai = require('clarifai');
var async = require('async');

const app = express();
const testFolder = './images/side';
const testFolder2 = './images/front';
const fs = require('fs');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static(path.join(__dirname, '/../client/')));
app.use(express.static(path.join(__dirname, '/../images/')));
app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var clarifaiApp = new Clarifai.App('sJLLnP9zyFTOBtjItyVfpqYlOE2kIo3NUN_xetmv', 'ZitJzM0PkSo6e1UHTl1tEsvj2a-qBpZn_7CrKOoO');

clarifaiApp.getToken();

router.post('/sendFrame', (req, res) => {
  clarifaiApp.inputs.search({ input: {url: 'http://i64.tinypic.com/r1y39t.jpg'} })
    .then((response) => {
        console.log('RESPONSE:: ', response)
        const date = new Date(Date.now()).toLocaleDateString();
        const time = new Date(Date.now()).toLocaleTimeString();
        if(response.hits[0].score > 0.79) {
          res.send(response.hits[0].input.data.concepts[0].id + ' has been found!')
        } else {
          res.send("no" + response.hits[0].input.data.concepts[0].id + "here...");
        }
      })
      .catch((err) => {
        console.log("ERRORRRR:", err)
      }) 
})

app.use('/', router);

const port = process.env.PORT || 3001;

const side = fs.readdirSync(testFolder).map(file => {
  return file;
})

const front = fs.readdirSync(testFolder2).map(file => {
  return file;
})

const image = {
  side: side,
  front: front,
}

app.get('/images', (req, res) => {
  res.send(image);
})

app.listen(port, (err) => {
  if(err) {
    console.log('Error occurred : ', err);
  }
  console.log('Server is listening to port : ', port);
});


module.exports = app;
