import mongoose, { mongo } from "mongoose";



const userSchema=new mongooseongoose.Schema(
  {
    usename:{ type:String},
    password:String,
    purchsedItems :[{type: mongoose.Schema.Types.ObjectId,ref:'Products'}]
    });

const User=mongoose.model("user",userSchema);
export {User}