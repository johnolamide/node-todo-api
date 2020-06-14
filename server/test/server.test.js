const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectId();
  text: 'First test todo'
}, {
  _id: new ObjectId();
  text: 'Second test todo',
  completed: true,
  completedAt: 123
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

// test for POST /todos
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) =>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos) =>){
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('shoud not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e))
    })
  })
});


// test for GET /todos
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length)toBe(2);
    })
    .end(done);
  })
});

// test for GET /todos/:id
describe('GET /todos/:id', () =>{
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done)
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectId().toHexString()
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  });

  it('should return 404 for non-object id', (done) => {
    request(app)
    .get('/todos/123abc')
    .expect(404)
    .end(done)
  });

// test for DELETE /todos/:id
describe('DELETE /todos/:id', () =>{
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect(() => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) =>{
      if (err) {
        return done(err);
      }

      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) =>{
    var hexId = new ObjectId().toHexString()
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  });

  it('should return 404 if object id is invalid', (done) =>{
    request(app)
    .delete('/todos/123abc')
    .expect(404)
    .end(done)
  });

});

// test for PATCH /todos/:id
describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) =>{
    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.completedAt).toBe('number');
    })
    .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    it('should update the todo', (done) =>{
      var hexId = todos[1]._id.toHexString();
      var text = 'This should be the new text!!!';

      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.completedAt).toNotExist();
      })
      .end(done);
  });
});
