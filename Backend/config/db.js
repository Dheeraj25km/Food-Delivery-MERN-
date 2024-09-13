import mongoose from "mongoose";

export const connectDB = async () => {
    
        await mongoose.connect("mongodb+srv://dheeraj25122002:1uW9yfuHUgzcsz57@cluster0.lyjfs.mongodb.net/fooddelivery").then(()=>
        console.log("DB connected"))
};
