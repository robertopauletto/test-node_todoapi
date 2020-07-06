const {
  ObjectID
} = require('mongodb')

const {
  mongoose
} = require('../server/db/mongoose.js')
const {
  Todo
} = require('../server/models/todo.js')
const {
  User
} = require('../server/models/users.js')

mongoose.set('useFindAndModify', false)

// Todo.remove({}).then(result => {
//   console.log(result)
// }).catch(e => console.log(e))

// Todo.findByIdAndRemove('5f021ac26166f886974a808a').then(todo => {
//   console.log(todo)
// }).catch(e => console.log(e))

Todo.findOneAndRemove({
  text: 'temp'
}).then(todo => {
  console.log(todo)
}).catch(e => console.log(e))