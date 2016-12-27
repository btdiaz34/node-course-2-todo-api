//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require("mongodb")

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Connected to MongoDB server');

  //deleteMany
// db.collection('Todos').deleteMany({text: "Eat Lunch"}).then((result)=>{
//   console.log(result);
// });
db.collection("Users").deleteMany({name: 'Brian'});
db.collection('Users').findOneAndDelete({
  _id: new ObjectID("584cc468ed775e32dc5750c1")
}).then((res)=>{
  console.table(res);
});

db.collection('Todos').deleteOne({text: "Eat Lunch"}).then((result)=>{
   console.log(result);
});
db.collection('Todos').findOneAndDelete({completed: false}).then((results)=>{
  console.log(result);
});
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
