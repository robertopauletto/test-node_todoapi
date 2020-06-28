const assert = require('assert')

// const MongoClient = require('mongodb').MongoClient
const {
  MongoClient,
  ObjectID
} = require('mongodb')
const {
  clearScreenDown
} = require('readline')

const url = 'mongodb://localhost:27017'

const mongoOpt = {
  useUnifiedTopology: true,
}
const client = new MongoClient(url, mongoOpt)
const dbName = 'ToDoApp'

client.connect(function (err, client) {
  if (err) {
    console.log(err)
  }
  console.log('Connected!')
  const db = client.db(dbName)
  const coll = db.collection('todo')

  coll.findOneAndUpdate({
    text: 'Da aggiornare 3'
  }, {
    $set: {
      text: 'Aggiornato 3',
      completed: true
    }
  }, {
    returnOriginal: false
  }).then(result => {
    console.log(result)
  }, err => {
    console.log(err)
  })


})