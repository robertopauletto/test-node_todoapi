const express = require('express')
const bodyParser = require('body-parser')
const {
  ObjectID
} = require("mongodb")

const {
  mongoose
} = require('./db/mongoose.js')
const {
  Todo
} = require('./models/todo.js')
const {
  User
} = require('./models/users.js')

const port = process.env.PORT || 3000


const todos = '/todos'
const app = express()

app.use(bodyParser.json())

app.post(todos, (req, res) => {
  let todo = new Todo({
    text: req.body.text,
  })

  todo.save().then(
    (doc) => {
      res.send(doc)
    },
    (err) => {
      res.status(400).send(err)
    }
  )
})

app.get('/todos', (req, res) => {
  Todo.find().then(docs => {
    res.send({
      todos: docs
    })
  }, err => {
    res.status(400).send(err)
  })
})

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: `Not a valid id ${id}`
    })
  }

  Todo.findById(id).then(doc => {
    if (!doc) {
      return res.status(404).send(`Not found ${id}`)
    }
    res.send({
      todo: doc
    })
  }).catch(e => res.status(400).send(`Unable to perform query\n ${e}`))
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})

module.exports = {
  app
}