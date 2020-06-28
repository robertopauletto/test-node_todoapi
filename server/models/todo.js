const mongoose = require('mongoose')

let Todo = mongoose.model('ToDo', {
  text: {
    type: String,
    required: true,
    minlenght: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    deafult: null
  }
})

module.exports = {Todo}