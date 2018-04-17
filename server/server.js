const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Dog} = require('./models/dog.js');
const hbs = require(`hbs`);
const path = require(`path`);
const _ = require(`lodash`);
const methodOverride = require(`method-override`);
const app = express();

//hbs set up
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../app/views'));
hbs.registerPartials(path.join(path.join(__dirname,'../app/views/partials')));
//setup
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
const database = process.env.MONGODB_URI || "mongodb://localhost:27017/Doglist"
mongoose.connect(database)
  .then(() => {
    console.log('connected to database');
  }).catch(() => {
    console.log('unable to connect to database');
  })
//-------------------middle ware---------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride(`_method`));
app.use(express.static(path.join(__dirname,`../public`)))
app.get('/', (req, res) => {
  res.redirect(`/dogs/home`)
  // res.send("GET /");
})

//-------------------middle ware---------------------

app.get(`/dogs`,(req,res)=>{

  Dog.find()
  .then(dogs=>{
    res.send(dogs);
  })
  .catch(e=>{
    res.status(404).send();
  })
})

app.get(`/dogs/new`,(req,res)=>{
  res.render(`./dogs/new`);
});
app.get(`/dogs/home`,(req,res)=>{
  res.render(`./dogs/home`,{
  });
})
app.get(`/dogs/show`,(req,res)=>{
  res.render(`./dogs/show`)
})
app.post('/dogs', (req, res) => {


  if(!req.body.name||!req.body.age){
    console.log("bad request");
    res.status(400).send();
  }else{
  const dog = new Dog({
    name: req.body.name,
    age: req.body.age
  })
  dog.save()
    .then(dog => {
      res.redirect('/dogs/home');
    })
    .catch(e => {
      res.status(400).send();
    })}
})

// app.delete(`/dogs/:id`,(req,res)=>{
//   console.log("hit the delete rout");
// })

app.listen(port, () => {
  console.log( `Listening on port ${port}`);
})
