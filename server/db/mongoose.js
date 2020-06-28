const mongoose = require('mongoose')

const mongoOpt = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
const url = 'mongodb://localhost:27017/ToDoApp'
mongoose.Promise = global.Promise
mongoose.connect(url, mongoOpt)

module.exports = {
  mongoose
}