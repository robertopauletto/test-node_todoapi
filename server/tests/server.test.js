const expect = require('expect')
const request = require('supertest')
const {
  ObjectID
} = require('mongodb')

const {
  app
} = require('../server')
const {
  Todo
} = require('./../models/todo.js')

const todos = [{
  _id: new ObjectID(),
  text: 'First test'
}, {
  _id: new ObjectID(),
  text: 'Second'
}]

beforeEach((done) => {
  Todo.deleteMany().then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = "test 3"
    request(app)
      .post('/todos')
      .send({
        text: text,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find({
            text
          })
          .then((docs) => {
            expect(docs.length).toBe(1)
            expect(docs[0].text).toBe(text)
            done()
          })
          .catch((e) => done(e))
      })
  })

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then(docs => {
          expect(docs.length).toBe(2)
          done()
        }).catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  let id = todos[0]._id.toHexString()
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return 404 if todo not found', (done) => {
    notFoundId = String.fromCharCode(id.charCodeAt(0) + 1) + id.slice(1)
    request(app)
      .get(`/todos/${notFoundId}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 for non object id', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  })


})