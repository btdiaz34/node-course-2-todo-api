const {ObjectID} = require('mongodb');

const {mongoose}= require('./../server/db/mongoose');
const {Todo}= require('./../server/model/todo');
const {User}= require('./../server/model/user');

// Todo.remove({}).then((res)=>{
//   console.log(res);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('586b23dd01db7cac1ce41d6a').then((todo)=>{
  console.log(todo);
})
