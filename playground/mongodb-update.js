//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require("mongodb")

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Connected to MongoDB server');

db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('584ccfe6bd875f0f1b134a55')
},{
  $set: {
  completed: false
  }
},{
  returnOriginal: false
}).then((result)=>{
  console.log(result);
});

db.collection('Users').findOneAndUpdate({
   _id: new ObjectID('584cc68593439f0fc87257f7')
},{
  $set:{
    name: "Breanna Irizarry"
  },
  $inc: {
    age: 10
  }
},{
  returnOriginal: false
}).then((result)=>{
  console.log(result);
});



//db.close()
});
