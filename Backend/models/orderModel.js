
// create placeorder functionality for proceed payment

import mongoose from "mongoose"
const itemSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Store the item ID
    name: { type: String, required: true }, // Store the item name
    price: { type: Number, required: true }, // Store the item price
    quantity: { type: Number, required: true } // Store the quantity of the item
  });
const orderSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    items: [itemSchema],
    // item:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    data:{type:String,default:Date.now()},  // date.now set current date
    payment:{type:Boolean,default:false}
})

const orderModel = mongoose.models.order|| mongoose.model("order",orderSchema)
export default orderModel;