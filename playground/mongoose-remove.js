const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findOneAndRemove({}).then((todo) => {
  
});

Todo.findByIdAndRemove('5ee65edc54e9465c1a6e5d65').then((todo) => {
  console.log(todo);
});
