const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;
const dogSchema = new Schema({
  name:{
    type: String,
    required: true,
    minLength:1,
    unique:true
  },
  age:{
    type:Number,
    required:true
  }
});
const Dog = mongoose.model(`Dog`,dogSchema)
module.exports={Dog};
