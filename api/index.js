import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import productRoutes from './routes/product.route.js'
import orderRoutes from './routes/order.route.js'
import path from "path";


dotenv.config();


mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log("MongoDB is connected");
})
.catch((err) => {
    console.log(err);
});
const __dirname=path.resolve();

const app = express();


app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on prot 3000");
  });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order",orderRoutes)

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
