
//  use to show all data in list form, added in database from database;


import React, { useEffect, useState } from 'react'
import "./List.css"
import axios  from 'axios';
import { toast } from 'react-toastify';

function List({url}) {

  
 const [list,setList] = useState([]);

 const fetchList = async ()=>{
    const response  = await axios.get(`${url}/api/food/list`);
    //  console.log(response)
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
 }


  // create a function for click on x delete item from list and database
   const removeFood = async(foodId)=>{
    // console.log(foodId)
    // remove food using API post methode
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error("Error")
    }
    
   }



  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
         <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>

                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.categoty}</p>
                <p>{item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>

            )
          })}
         </div>
    </div>
  )
}

export default List
