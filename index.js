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

app.get('/info', (req, res) => {
  res.send(`
    <div>puhelinluettelossa ${persons.length} henkilön tiedot</div>
    <div>${new Date().toString()}</div>
  `)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
