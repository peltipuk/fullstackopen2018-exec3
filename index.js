const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Martti Tienari',
    'number': '040-123456',
    'id': 2
  },
  {
    'name': 'Arto Järvinen',
    'number': '040-123456',
    'id': 3
  },
  {
    'name': 'Lea Kutvonen',
    'number': '040-123456',
    'id': 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
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

  if (persons.find(person => person.name === body.name)) {
    return res.status(409)
      .json({ error: `number already exists for '${body.name}'` })
  }

  const id = Math.floor(Math.random() * 1e10)
  console.log(`Creating new person with generated id ${id}`)
  const person = {
    name: body.name,
    number: body.number,
    id: id
  }
  persons = persons.concat(person)
  res.status(201).json(person)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
