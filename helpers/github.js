const axios = require('axios');
const config = process.env.GIT_TOKEN || require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  console.log('this is what the axios GET request is sending to the GH API', username, options)
  axios.get(`https://api.github.com/users/${username}/repos`, options)
  .then((response) => {
    callback(response)
  })
}

module.exports = getReposByUsername;