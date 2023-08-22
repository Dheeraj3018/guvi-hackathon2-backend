import mongoose from "mongoose";


const adminSchema=new mongoose.Schema({
  username:{type:String},
  password:String,
  })


  const Admin=mongoose.model("admin",userSchema);
  export {Admin}