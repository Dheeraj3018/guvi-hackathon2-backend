import dotenv from "dotenv";
import express from "express";
import { dataBaseConnection } from "./db.js";
import cors from "cors";

//env configurations
dotenv.config();

//database connections
dataBaseConnection();

const app = express();
const PORT = process.env.PORT;
const adminRoutes=require("./routes/admin.js");
const userRoutes=require("./routes/users.js");
//moddlewares
app.use(express.json());
app.use(cors())




app.listen(PORT, () => console.log(`Server is up and running in ${PORT}`));
