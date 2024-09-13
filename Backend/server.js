import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
 import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
// import connectDB from "./config/db.js"

const app = express();
const port =process.env.PORT ||4000


//midleware
// use to connect frontend to backend;
app.use(express.json())
// const cors = require('cors');
app.use(cors());

// db connection
connectDB();
//api end point
  app.use("/api/food",foodRouter);
  //access uploaded image
  app.use("/images",express.static('uploads'))

  // use for login user
  app.use("/api/user",userRouter)
  
  //  use for cart
  app.use("/api/cart",cartRouter)

  // use for order product
  app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("server is working")
})

app.listen(port,()=>{
    console.log(`server listing on http://localhost:${port}`);
})