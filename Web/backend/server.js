import 'dotenv/config'
import express from "express";
import cors from "cors";
import connectDb from "./db/db_connect.js";

import authRoutes from "./routes/auth.route.js"
import communityRoutes from "./routes/community.route.js"



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/community",communityRoutes);


app.get("/",(req,res)=>{
  res.json({message: "Hello world"});
})

app.listen(PORT,()=>{
  connectDb();
  console.log(`Server is running on port ${PORT}`);
})