const {
  ObjectID
} = require('mongodb')

const {
  mongoose
} = require('./../server/db/mongoose.js')
const {
  Todo
} = require('./../server/models/todo.js')


let id = '5efa3808346d201386fb42c0'
let wrongId = '6afa3346d201386fb42c0'

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log(todos)
// })

// Todo.findOne({
//   _id: id
// }).then(doc => {
//   console.log(doc)
// })

// Todo.findById(id).then(doc => {
//   console.log(doc)
// })

if (!ObjectID.isValid(wrongId)) {
  console.log('Id not valid!!!')
}

Todo.findById(wrongId).then((todos) => {
  if (!todos) {
    return console.log('Not Found!')
  }
  console.log(todos)
}).catch(e => console.log(e))