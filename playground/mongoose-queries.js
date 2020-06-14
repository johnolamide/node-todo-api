const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5ee4831246b7625d2ca443c211';
//
// if (!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) =>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not find');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

User.findById('5ee49346f53ffd0df00aca9f').then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by Id', user);
}, (e) => {
  console.log(e);
});
