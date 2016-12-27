//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require("mongodb")

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Connected to MongoDB server');

  //returns a cursor. A pointer to the docs
  // .toArray
  // db.collection("Todos").find({
  //   _id: new ObjectID("584ccfe6bd875f0f1b134a55")
  //
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err)=>{
  //   console.log('Unable to fetch todos', err);
  // });
  // db.collection("Todos").find().count().then((count)=>{
  //   console.log(`Todos count: ${count}`);
  //
  // }, (err)=>{
  //   console.log('Unable to fetch todos', err);
  // });

db.collection('Users').find({
  name: "Brian Diaz"
}).toArray().then((docs)=>{
  console.log(`Array of users with the name of`);
  console.log(docs[0].name);
  console.log(JSON.stringify(docs,undefined,2));

},(err)=>{
  console.log('Unable to fetch these users ', err);
});

// db.close();
});
