const assert = require('assert')

// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

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
  db.collection('todo')
    .find()
    .toArray(function (err, docs) {
      if (err) {
        console.log(err)
      }
      console.log(JSON.stringify(docs, undefined, 2))
      console.log(`${docs.length} documents`)
      db.collection('todo')
        .find({ _id: new ObjectID('5ef2495664f2592b46b2bfd3') })
        .toArray(function (err, docs) {
          if (err) {
            console.log(err)
          }
          console.log(JSON.stringify(docs, undefined, 2))
          console.log(`${docs.length} documents`)
        })
      db.collection('todo')
        .find()
        .count()
        .then(
          (count) => {
            console.log(`${count} items`)
          },
          (err) => {
            console.log(err)
          }
        )
      db.collection('users')
        .find({ name: 'Ivo' })
        .toArray()
        .then(
          (data) => {
            console.log(JSON.stringify(data))
          },
          (err) => {
            console.log(err)
          }
        )
      db.collection('todo')
        .find({ completed: true })
        .toArray(function (err, docs) {
          if (err) {
            console.log(err)
          }
          console.log(JSON.stringify(docs, undefined, 2))
          console.log(`${docs.length} documents`)
          client.close()
        })
    })
})
