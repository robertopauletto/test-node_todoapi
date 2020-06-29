const express = require('express')
const bodyParser = require('body-parser')

const {
  mongoose
} = require('./db/mongoose.js')
const {
  Todo
} = require('./models/todo.js')
const {
  User
} = require('./models/users.js')

const port = 3000
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

module.exports = {
  app
}