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

  // deleteMany
  /*   coll.deleteMany({
      text: /eliminare/i
    }).then(result => {
      console.log(`${result.deletedCount} deleted`)
      client.close()
    }, err => {
      console.log(err)
    })
   */

  // deleteOne
  /*   coll.deleteOne({
      _id: new ObjectID("5ef1011f99d30543dafa0add")
    }).then(result => {
      console.log(`${result.deletedCount} deleted`)
    }, err => {
      console.log(err)
    })
   */
  // findOneAndDelete
  coll.findOneAndDelete({
    text: 'Da fare 2'
  }).then(result => {
    console.log(result)
  }, err => {
    console.log(err)
  })

})