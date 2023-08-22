import express from "express";
import { Admin } from "../models/admin";
import mongoose from "mongoose";
import { Product } from "../models/products";
import { Jwt } from "jsonwebtoken";
import { Admin } from "../models/admin";

const app=express();

app.use(express.json());


app.post('/admin/signup',async(req,res)=>{
const{username,password}=req.body;
function callback(admin){
  if(admin){
    res.status(403).json({message:'Admin already exists'});
  }else{
    const obj={username:username,password:password};
    const newAdmin=new Admin(obj);
    newAdmin.save();
    const token =jwt.sign({username,role:'admin'},SECRET);
    res.json({message:'Admin created successfully',token});
  }
}
Admin.findOne({username}).then(callback);
});

app.post('/admin/login',aync(req,res)=>{
  const {username,password}=req.headers;
  const admin=await Admin.finfOne({username,password});
  if(admin){
    const token=jwt.sign({username,role:'admin'},SECRET);
    res.json({message:"logged in Successfully",token});
  }else{
    res.status(403).json({message:'Invalid username or password'});
  }
});

app.post('/admin/products',authenticateJwt,aync(req,res)=>{
  const product=new Product(req.body);
  await product.save();
  req.json({message:'Product Created Successfully',productId:product.id});
})

app.put('/admin/products/:productId',authenticateJwt,aync(req,res)=>{
  const product=await Product .findByIdAndUpdate(req.params.courseId,req.body,{new:true});
  if(product){
    res.json({message:'Product updated successfully'});
  }else{
    res.json(404).json({message:'Product not found'});
  }
});

app.get('/admin/products',authenticateJwt,async(req,res)=>{
  const products=await Product.find({});
  res.json({products});
})


module.exports=router