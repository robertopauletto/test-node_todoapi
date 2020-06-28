const assert = require('assert')

// const MongoClient = require('mongodb').MongoClient
const {
  MongoClient,
  ObjectID,
  ObjectId
} = require('mongodb')
const {
  connect
} = require('http2')

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
  const coll = db.collection('users')

  let ids = []

  coll.find().toArray().then(result => {
    for (item of result) {
      coll.deleteOne({
        _id: new ObjectId(item._id)
      }).then(result => {
        console.log(`Deleted ${item._id}`)
      }, err => {
        console.log('Deletion error ' + err)
      })
    }
  }, err => {
    console.log(err)
  })

})