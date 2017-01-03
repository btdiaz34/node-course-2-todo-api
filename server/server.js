var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose}= require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user')

var app = express();
const port = process.env.PORT || 3000;
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
app.delete('/todos/:id',(req,res)=>{
    //findByIdAndRemove
      let id= req.params.id
    //get the id

    //validate the id-> not valid? return 404
    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }
    //remove todo by id
    //success
      //
      Todo.findByIdAndRemove(id).then((delObj)=>{
        if(!delObj){
          return res.status(404).send();
        }

        res.send(delObj).catch((e)=>{
          res.status(400).send();
        });
      });
    //400 with empty body

});

app.listen(port,()=>{
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
