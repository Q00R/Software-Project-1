const mongoose = require('mongoose');
const schemaOptions = {
  strict: false,
  timestamps: true,
};
const userschema = new mongoose.Schema(
  {
    _id: { type: ObjectId },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:5},
    name:{type:String} ,
    role: {
      type: String,
      required: true,
      
    },
  },
  // schemaOptions
  {
    strict: false,
    timestamps: true,
  }
);


module.exports = mongoose.model('userModel', userschema);