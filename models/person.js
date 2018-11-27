const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)

if (process.env.mongo_user === undefined || process.env.mongo_password === undefined) {
  console.log('Provide username and password in env variables mongo_user and mongo_password')
  process.exit(1)
}

const url = `mongodb://${process.env.mongo_user}:${process.env.mongo_password}@ds117334.mlab.com:17334/fullstack`
const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

mongoose.connect(url)

module.exports = Person
