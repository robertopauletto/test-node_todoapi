const {
  ObjectID
} = require('mongodb')
const mongoose = require('mongoose')

const mongoOpt = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
const url = 'mongodb://localhost:27017/ToDoApp'
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || url, mongoOpt)

module.exports = {
  mongoose,
  ObjectID
}