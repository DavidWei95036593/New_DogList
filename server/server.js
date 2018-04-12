const express = require(`express`);

const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
// const {Dog}=require(`./models/dog.js`);
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.get(`/`,(req,res)=>{
  res.send("It worksa");
})
app.post(`/dogs`,(req,res)=>{
  const dog = new Dog({
    name:`Spot`,
    age:2
  })
  dog.save()
    .then(dog=>{
      res.send(dog);
    })
    .catch(error=>{
      res.status(400).send();
    })
})

app.listen(port,()=>{
  console.log(`listen to port ${port}`);
})
