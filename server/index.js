const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const path = require('path');
const fs = require('fs');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/folders', (req, res) => {
  const folderPath = path.join(__dirname, '../test-folders');
  fs.readdir(folderPath, (err, folders) => {
    if (err) {
      throw err;
    } else {
      console.log(folders);
      let filePaths = [];
      for (let i = 0; i < folders.length; i++) {
        if (folders[i] !== '.DS_Store') {
          filePaths.push(path.join(folderPath, folders[i]));
        }
      }
      res.send(filePaths);
    }
  });
});

app.get('/folders/:folderName', (req, res) => {
  const folderPath = path.join(__dirname, '../test-folders', req.params.folderName);
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    else {
      console.log(files);
      res.send(files);
    }
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});