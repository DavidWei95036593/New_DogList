const express = require(`express`);
const app = express();
const port = process.env.PORT || 3000;
app.get(`/`,(req,res)=>{
  res.send("It worksa");
})


app.listen(port,()=>{
  console.log(`listen to port ${port}`);
})
