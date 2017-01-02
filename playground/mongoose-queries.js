const {ObjectID} = require('mongodb');

const {mongoose}= require('./../server/db/mongoose');
const {Todo}= require('./../server/model/todo');
const {User}= require('./../server/model/user');


var id = '58649b533091d53a88352e4c';

User.findById(id).then((user)=>{
  if(!user)
    return console.log('Unable to find user');

  console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);
})


// var id='586a982681729440d402792f';

// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log("Id not found");
//   }
//   console.log('Todo By ID', todo);
// }).catch((e)=> console.log(e));
