import React from 'react'
import "./Order.css"
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import {assets} from "../../assets/assets"

function Order({url}) {


  // store and use listorder API from orderControllers

   const [ order,setOrder] = useState([]);

   const fetchAllOrders = async ()=>{
    // call API and store
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
         setOrder(response.data.data);
         console.log(response.data.data)
    }else{
           toast.error("Error in order Pannel") // toasr use for notification
    }
   }

   useEffect(()=>{
    fetchAllOrders();
   },[])
    
   // link API to order pannel updateOrderStatus APi

   const statusHandler = async(event,orderId)=>{
      // console.log(event,orderId)
      // if change in develry status also change in database
      const response = await axios.post(url+"/api/order/status",{     // call API
        orderId,
        status:event.target.value
      })
      if(response.data.status){
        fetchAllOrders();         // agar true hoga to status upadate ho jayega
      }
   }

  return (
   
        <div className='order-add'>
          <h3>Order Page</h3>
          <div className="order-list">
            {order.map((order,index)=>(                                     
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                <p className='ordre-item-food'>
                {order.items.map((item,index)=>{
                   if(index===order.items.length-1){
                    return item.name+" X "+item.quantity
                   }else{
                        return item.name+" X "+item.quantity+","
                   }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName+""+ order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pinCode}</p>
              </div>
                <p className='order-item-phone'>{order.address.phone}</p>

              </div>
                <p>Items : {order.items.length}</p>
                <p>{order.amount}</p>

                <select onChange={(event)=>statusHandler (event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>


                </div>
                
            ))}

       </div>
    </div>
  )
}

export default Order
