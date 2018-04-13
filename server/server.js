const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Dog} = require('./models/dog.js');
const hbs = require(`hbs`);
const path = require(`path`);
const _ = require(`lodash`);
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res) => {
  res.redirect(`/dogs/new`)
  res.send("GET /");
})

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
      res.redirect('/dogs');
    })
    .catch(e => {
      res.status(400).send();
    })}
})

app.listen(port, () => {
  console.log( `Listening on port ${port}`);
})
