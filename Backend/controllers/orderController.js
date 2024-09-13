import orderModel  from "../models/orderModel.js";
import userModel from "../models/userModels.js"
import Stripe from "stripe"   // for payment integration

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



//placing order for frontend
const placeorder = async (req,res)=>{

//   require frontend url
const frontend_url = "http://localhost:5174"

  try {
         const newOrder = new orderModel({      // create a new order
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

         })
         console.log("hello")
        // console.log("neworder is"+newOrder)
        console.log("hii")
         await newOrder.save() // save order in database
         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
         
        //  Create Stripe payment link

        const line_items = req.body.items.map((item)=>({   // craete for payment
            price_data:{
                currency:"INR",
                product_data:{
                    name:item.name
                },
               unit_amount:item.price*100*20
            },
            quantity:item.quantity
        }))
//      push delivery charge in line item

          line_items.push({
            price_data:{
                currency:"INR",
                product_data:{
                   name:"Delivery charges"
                },
                unit_amount:2*100*20
            },
            quantity:1
          })
          
          const session = await stripe.checkout.sessions.create({
             line_items:line_items,
             mode:'payment',
            //  if payment is success then page redirect these url
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
           
          })
            //  console.log(session)
          res.json({success:true,session_url:session.url}) // send session url as a response
        } 
  catch (error) {
     console.log(error);
     res.json({success:false,message:"Error in Payment"})
  }
}
const verifyOrder = async (req,res)=>{
   const {orderId,success} = req.body;
   try {
       if(success=="true"){
       await  orderModel.findByIdAndUpdate(orderId,{payment:true});
       res.json({success:true,message:"Paid"})
       }
       else{
        await orderModel.findByIdAndDelete(orderId)
        res.json({success:false,message:"Not Paid"})
       }
   } catch (error) {
    console.log(error)
    res.json({success:false,message:"Payment Error"})
    
   }
}
  // user Order for frontent // display order on admin pannell
  const userOrder = async (req,res)=>{
    try {
      const order = await orderModel.find({userId:req.body.userId}) // find all selected order and store in order
      res.json({success:true,data:order})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error in Order"})
    }
  }


  //  create API for admin Order page  listing order on admin pannel
  // get all myorder data on Admin order pannel
  const listOrders = async(req,res)=>{
         try {
            const orders= await orderModel.find({});
            res.json({success:true, data:orders})
         } catch (error) {
            console.log(error);
            res.json({success:false,message:"error in ListAdmin"})
         }
  }




  // create api for update order delivery status

  const updateOrderStatus = async(req,res)=>{
      try {
         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
         res.json({success:true,message:"Status Updated"})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"Status Not Updated"})
      }
  }

export {placeorder,verifyOrder,userOrder,listOrders,updateOrderStatus}