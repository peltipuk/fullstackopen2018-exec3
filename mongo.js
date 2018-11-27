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

//console.log(`user: ${process.env.mongo_user}`)
//console.log(`password: ${process.env.mongo_password}`)

if (process.argv.length === 2) {
  mongoose.connect(url)
  console.log('puhelinluettelo:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 4) {
  mongoose.connect(url)

  const name = process.argv[2]
  const number = process.argv[3]
  console.log(`Lisätään henkilö ${name} numero ${number} luetteloon`)

  const person = new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(response => {
      //console.log('person saved')
      mongoose.connection.close()
    })
} else {
  console.log('Usage: node mongo.js [<name> <number>]')
  console.log('Print persons in catalogue or add person')
  process.exit(1)
}
