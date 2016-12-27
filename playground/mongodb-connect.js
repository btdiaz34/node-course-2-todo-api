//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require("mongodb")
//Obj destructuring is the ability
//to pull out props of obj to create var


// takes the path of the host url and
// callback will fire after connection passed or failed


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: "something to do",
  //   completed: false
  // },(err,result)=>{
  //   if(err){
  //   return  console.log("Unable to insert document ",err);
  //   }
  //
  // //   console.log(JSON.stringify(result.ops,undefined,2));
  // //
  // // })
// db.collection('Users').insertOne({
//     name: "Brian Diaz",
//   age: 22,
//   location: "Lake Grove"
// },(err,result)=>{
//   if(err){
//     console.log("Unable to insert user ",err);
//   }
//   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
// });
  db.close();
});
