const express = require('express');
let app = express();
const { Repo, getAll, save } = require('../database');
const getReposByUsername = require('../helpers/github')

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static(`client/dist`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('server received Post request ', req.body.username)
  getReposByUsername(req.body.username, function(data){
    // save repos to the db
    console.log('this is the data the server is sending to the database');
    save(data)
      //respond with 201
      .then(() => res.status(201).send())
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getAll()
      .then((data) => {
        console.log('This is what the server is sending back to the client', data)
        res.send(data)
      })
  console.log('server received Get request')
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

