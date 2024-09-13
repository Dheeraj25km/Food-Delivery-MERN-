import React, { useEffect, useState } from 'react'
import "./Add.css"
import {assets} from "../../assets/assets"
import axios from "axios"

import { toast } from 'react-toastify'

function Add({url}) {

  // create URL use to call API through asios post
  
 const[image,setImage] = useState(false);  // use to upload the image after the click provide onChange property
 const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
 })


 // onchangehandler use to handle data after provide
  const OnChangeHandler=(event)=>{
     const name= event.target.name;
     const value = event.target.value;
     setData(data=>({...data,[name]:value}))
  }

  // use for text data update are succsefully or not
  // useEffect(()=>{
  //   // console.log(data)
  // },[data])

  // Api Call

  const onSubmitHandler = async(event)=>{
      event.preventDefault();
      const formData = new FormData();
      formData.append("name",data.name)
      formData.append("description",data.description)
      formData.append("price",Number(data.price))  // price is string change in number
      formData.append("category",data.category)
      formData.append("image",image)

      const response = await axios.post(`${url}/api/food/add`,formData) // API call use post methode
      
      console.log(response.data.message)
      if(response.data.success){
        setData({
          name:"",
         description:"",
         price:"",
         category:"Salad"
        })
        setImage(false);
        toast.success(response.data.message)  // show message on display after added food .
      }
        else{
          toast.error(response.data.message)
      }
      
  }



  return (
    <div className='add' >
     
      <form  className="flex-col " onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={((e)=>
            // setImage(console.log(e))
            setImage(e.target.files[0])
            )} type="file" id='image' hidden required />
         
        </div>
        <div className="add-product-name flex-col">
              <p>Product name</p>
              <input onChange={OnChangeHandler} value={data.name} type="text" name='name' placeholder='type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={OnChangeHandler} value={data.description} name='description' rows="6" placeholder='write content here'/>
        </div>
          <div className="add-ceategory-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select onChange={OnChangeHandler}  name='category'>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>

            </div>
            <div className="add-price-file flex-col">
              <p> Product price</p>
              <input onChange={OnChangeHandler} value={data.price} type="Number" name='price' placeholder='20' />
            </div>
          </div>
          <button type='submit' className='add-btn'>Add</button>
        </form> 
    </div>
  )
}

export default Add
