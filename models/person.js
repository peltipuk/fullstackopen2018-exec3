const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)

if (process.env.mongo_user === undefined || process.env.mongo_password === undefined) {
  console.log('Provide username and password in env variables mongo_user and mongo_password')
  process.exit(1)
}

const url = `mongodb://${process.env.mongo_user}:${process.env.mongo_password}@ds117334.mlab.com:17334/fullstack`
const personSchema = mongoose.Schema({
  name: String,
  number: String,
})
personSchema.statics.format = function (person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}
const Person = mongoose.model('Person', personSchema)

mongoose.connect(url)
module.exports = Person
