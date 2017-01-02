var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose}= require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user')

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  let todo=new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
    });

});

app.get('/todos',(req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});

  },(e)=>{
    res.status(400).send(e);
  })
});
// GET /todos/1234223

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;

  //Validate ID using isValid
  //404 - send back empty send
   if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }
  //find by ID
    // success case
    Todo.findById(id).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }

      res.send({todo});
    }).catch((e)=>{
      res.status(400).send();
    });
  });


app.listen(3000,()=>{
  console.log('Started on port 3000');
});

module.exports = {app};
