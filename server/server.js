const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
// const {Dog}=require(`./models/dog.js`);
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.get(`/`,(req,res)=>{
  res.send("It worksa");
})


app.listen(port,()=>{
  console.log(`listen to port ${port}`);
})
