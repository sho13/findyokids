const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const testFolder = './images/side';
const testFolder2 = './images/front';
const fs = require('fs');



app.use(express.static(path.join(__dirname, '/../client/')));
app.use(express.static(path.join(__dirname, '/../images/')));
app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

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
