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
  const folderPath = path.join(__dirname, '../client/public/test-folders');
  fs.readdir(folderPath, (err, folders) => {
    if (err) {
      throw err;
    } else {
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
  const folderPath = path.join(__dirname, '../client/public/test-folders', req.params.folderName);
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    else {
      res.send(files);
    }
  });
});

app.get('/folders/:folderName/:fileName', (req, res) => {
  const filePath = path.join(__dirname, '../client/public/test-folders', req.params.folderName, req.params.fileName);
  // const file = fs.createReadStream(filePath);
  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  // file.pipe(res);
  fs.readFile(filePath, (err, file) => {
    if (err) throw err;
    else {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
      res.send(file);
    }
  })
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});