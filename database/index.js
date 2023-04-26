const mongoose = require('mongoose');
if(process.env.type === "PROD") {
  mongoose.connect('mongodb://mlab/fetcher');
} else {
  mongoose.connect('mongodb://localhost/fetcher');
}


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: { type: Number, unique: true },
  name: String,
  username: String,
  url: String,
  stars: Number,
  description: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // console.log('these are the repos being saved', repos)
  return Repo.create(repos);
  // return Promise.all(repos.map(repo => {
  //   return new Repo(repo).save()
  // }))
}

let getAll = () => {
  return Repo.find({})
  .sort('-stars')
  .limit(25)
  .exec()
}

module.exports.save = save;
module.exports.Repo = Repo;
module.exports.getAll = getAll;