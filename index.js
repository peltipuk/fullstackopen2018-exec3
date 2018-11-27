const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms', { immediate: true }))
morgan.token('body', (req, res) => {
  return req.body ? JSON.stringify(req.body) : '{}'
})

// API
app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => res.json(persons.map(Person.format)))
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person
    .find({ _id: id })
    .then(persons => {
      console.log('Response:', persons)
      if (persons.length === 0) {
        res.status(404).end()
      } else {
        res.json(persons.map(Person.format))
      }
    })
    .catch(err => {
      res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person
    .findByIdAndDelete(id)
    .then(result => {
      console.log('Result: ', result)
      res.status(204).end()
    })

})

app.get('/info', (req, res) => {
  res.send(`
    <div>puhelinluettelossa ${persons.length} henkilön tiedot</div>
    <div>${new Date().toString()}</div>
  `)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'name missing' })
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
