import mongoose, { mongo } from "mongoose";
const {ObjectId}=mongoose.Schema

const productSchema=new mongoose.Schema(
  {
    productName:{
      type:String,
      required :true
    },
    imageLink:{type:String,required:true}
    description:{type:String,required:true}
    price:{type:Number,required:true}
    model:{type:String,required:true}
    user:{type:ObjectId,ref:"user"}
  }
)

const Product=mongoose.model("product",productSchema);
export {Product}

