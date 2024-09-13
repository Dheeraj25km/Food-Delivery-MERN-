import React, { useContext, useEffect, useState } from 'react'
import "./Myorder.css"
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import {assets} from "../../assets/assets"
const Myorder = () => {

    const {url,token} = useContext(StoreContext);
  const[data,setData]= useState([]);

  const fectOrder = async ()=>{

   const response = await axios.post(url+"/api/order/userorder",{},{headers:{token}}) // call api during calling with pass token
   setData(response.data.data)
   console.log(response.data.data)
  }
  useEffect(()=>{
    if(token){
       fectOrder();
    }
  },[token])

  return (
    <div  className='myorder'>
      <h2>My Order</h2>
      <div className="container">
        {data.map((order,index)=>{
          return(
            <div key={index} className="my-orders-order">
               <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item,index)=>{
                if(index===order.items.length-1){
                  return item.name+" X "+item.quantity
                }else{
                  return item.name+" X "+item.quantity+","
                }
              })}</p>
              <p>{order.amount}</p>
              <p> {order.items.length} </p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fectOrder}>Track Order</button>    {/* fetchOrder are used to change foodorder Status click on track order imidiate change order status */}
            </div>
          )
         
        })}
      </div>
      
    </div>
  )
}

export default Myorder
