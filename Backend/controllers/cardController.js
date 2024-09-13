
//  THIS IS UD=SED FOR HANDLE WHHEN PAGE IS RELOAD THEN IN CARD ITEM SELECTED ARE 
//   ARE AUTOMETICALLY REMOVED


import userModel from "../models/userModels.js"

// add item to user cart

const addCart = async(req, res)=>{
   try {
     let userdata = await userModel.findById(req.body.userId)  // convert token into user ID
     let cartData = await userdata.cartData; // extract cart data from userdata
    
     if(!cartData[req.body.itemId]){  // check pahle se cart me koi data hai ki nahi
        cartData[req.body.itemId]=1; // pahla item aaya hai to uska id ko 1 se initialise kar denge

     }else{
        cartData[req.body.itemId] +=1;   //pahle se hai to usame 1 ka increament kar denge
     }
     await userModel.findByIdAndUpdate(req.body.userId,{cartData}) // update cartdata in database
     res.json({success:true,message:"Added to cart"}) 

   } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error in cartData updation"})
   }
}

// remove  item from user cart
const removeFromCart = async(req,res)=>{
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -=1;  // is item exist then decrese the item count (id)
      }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true, message:"Removed from cart"})
   } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error in cart Removal"})
   }
}

//fetch user from cart data
const getCart = async(req,res)=>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData});
  } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error in getCart"})
  }
}


export {addCart,removeFromCart,getCart}