const assert = require('assert')
const { clearScreenDown } = require('readline')
// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')
const url = 'mongodb://localhost:27017'
const mongoOpt = {
  useUnifiedTopology: true,
}
const client = new MongoClient(url, mongoOpt)
const dbTodoApp = 'ToDoApp'

const insertTodo = function (db, callback) {
  const coll = db.collection('todo')
  coll.insertOne(
    {
      text: 'Da fare 2',
      completed: false,
    },
    (err, result) => {
      if (err) {
        return console.log('Errore ', err)
      }
      console.log(JSON.stringify(result.ops, undefined, 2))
      callback(result)
    }
  )
}

const insertUser = function (db, callback) {
  const coll = db.collection('users')
  coll.insertOne(
    {
      name: 'Rob',
      age: 60,
      location: 'Modena',
    },
    (err, result) => {
      if (err) {
        return console.log('Errore ', err)
      }
      assert(1, result.result.n)
      console.log(JSON.stringify(result.ops, undefined, 2))
      callback(result)
    }
  )
}

// Direct
// client.connect(function (err) {
//   if (err) {
//     console.log('MongoDb connection error! ', err)
//   }
//   console.log('Connected!')

//   const db = client.db(dbTodoApp)

//   db.collection('todo').insertOne(
//     {
//       text: 'terza cosa da fare',
//       completed: false,
//     },
//     function (err, res) {
//       if (err) {
//         console.log('Errore ', err)
//       }
//       console.log('Inserted ' + res.insertedCount + ' in todo collection')

//       db.collection('users').insertOne(
//         {
//           name: 'Ivo',
//           age: 46,
//           location: 'Rho',
//         },
//         function (err, res) {
//           if (err) {
//             console.log('Errore ', err)
//           }
//           console.log('Inserted ' + res.insertedCount + ' in users collection')
//           console.log(res.ops[0]._id.getTimestamp())
//           client.close()
//         }
//       )
//     }
//   )

client.connect(function (err) {
  if (err) {
    console.log('MongoDb connection error! ', err)
  }
  console.log('Connected!')

  const db = client.db(dbTodoApp)

  insertTodo(db, function () {
    insertUser(db, function () {
      client.close()
    })
  })

  // insertTodo(db, function () {
  //   client.close()
  // })
  // insertUser(db, function () {
  //   client.close()
  // })
})
