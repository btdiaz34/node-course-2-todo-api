const expect= require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app}= require('./../server');

const{Todo} = require('./../model/todo');

//run some code before every test case
//make sure database is empty
const todos = [{
  _id: new ObjectID(),
  text: "First test todo"
},{
  _id: new ObjectID(),
  text: 'Second test todo'
}];


beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
});
describe('Post /todos',()=>{
  it('should create a new todo',(done)=>{
    var text= 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
        expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if (err){
          return done(err);
      }
      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=> done(e));
    });
  });
    it('should not create todo with invalid body data',(done)=>{
        var text='';

        request(app)
        .post('/todos')
        .send({text})
        .expect(400)
        .end((err,res)=>{
          if(err){
            return done(err);
          }

          Todo.find().then((todos)=>{
            expect(todos.length).toBe(2);
            done();
          }).catch((e)=>done(e));
        });


    });
});

describe("GET /todos",()=>{
  it("should get all todos",(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos:id',()=>{
  it('should return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });
  it('Should return 404 if todo not found',(done)=>{
    var hexID = new ObjectID().toHexString();

    request(app)
    .get(`/todos/${hexID}`)
    .expect(404)
    .end(done);
  });

  it("Should return 404 for non-object ids ",(done)=>{


      request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done)
    });

});

describe("Delete /todos/:id",()=>{
   it('Should remove a todo',(done)=>{
      var hexID=todos[1]._id.toHexString();
        //console.log(todos[1]._id,"HOLY DICK TITS SANTA");
      request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res)=>{
      //
      //console.log(res.body.delObj);
        expect(res.body.delObj._id).toBe(hexID);
      })
      .end((err,res)=>{
        if(err){
          return done(err)
        }
        Todo.findById(hexID).then((delObj)=>{
          expect(delObj).toNotExist();
          done();

        }).catch((e)=>done(e));
      });
   });

  it('Should return a 404 if todo not found',(done)=>{
    var hexID=new ObjectID().toHexString();


    request(app)
    .delete(`/todos/${hexID}`)
    .expect(404)
    .end(done);
  });



  it('Should return a 404 if object id is invalid',(done)=>{
      request(app)
      .delete(`/todos/$123abd`)
      .expect(404)
      .end(done);

  });
});
