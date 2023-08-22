import express from "express";
import { User } from "../models/user";
import { Product } from "../models/products";
import { Jwt } from "jsonwebtoken";
import { User } from "../models/user";


const app = express();

app.use(express.json());

app.post("user/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await user.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET);
    res.json({ message: "User created Successfully", token });
  }
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/users/products", authenticateJwt, async (req, res) => {
  const products = await Products.find({ published: true });
  res.json({ courses });
});

app.post("/users/products/:productId", authenticateJwt, async (req, res) => {
  const product = await Product.findById(req.params.productId);
  console.log(product);
  if (product) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedProducts.push(product);
      await user.save();
      res.json({ message: "Product purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.get("/users/purchasedProducts", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedProducts"
  );
  if (user) {
    res.json({ purchasedProducts: user.purchasedProducts || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});
