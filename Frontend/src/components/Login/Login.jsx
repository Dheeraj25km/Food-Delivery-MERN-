import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import "./Login.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

function Login({setShowlogin}) {

   const {url,token,setToken} = useContext(StoreContext)

    const[currstate,setCurrstate]=useState("Login")

    // ***** Setup Login And Register API With FrontEnd 
     const[data,setData]= useState({
        name:"",
        email:"",
        password:""
     })
     const onChangeHandler = (event)=>{
        const name =event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))

     }

    //  setup API
     const onLogin = async (event) =>{
         event.preventDefault();
         let newUrl = url;
         if(currstate==="Login"){
            newUrl+="/api/user/login"
         }else{
            newUrl+="/api/user/register"
         }
         const response = await axios.post(newUrl,data);

         if(response.data.success){
            setToken(response.data.token); // save the token
            localStorage.setItem("token",response.data.token)  // sava data in local Storage and local storage available inspect me application section
            setShowlogin(false)
         }
      else{
        alert(response.data.message)
      }
     }
      // chck usestate work properly or not
    //   useEffect(()=>{
    //     console.log(data)
        
    //   },[data])
  return (
    <div>
         <div className="login">
            <form onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>{currstate}</h2>
                    <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-page">
                    {currstate==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name}  type='text' placeholder='Your name' required/>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='password'required />
                </div>
                <button type='submit' >{currstate==="Sign-Up"?"Create account":"Login"}</button>
                <div className="login-condition">
                    <input type='checkbox' required />
                    <p>By countinuing, i agree to the terms of use & privacy policy.</p>

                </div>
                {currstate==="Login"?
                <p>Create a new account ? <span onClick={()=>setCurrstate("Sign-Up")}>Click hare</span></p>
                :<p>Already have an account? <span onClick={()=>setCurrstate("Login")}>Login here</span></p>
            }
            </form>
         </div>
    </div>
  )
}

export default Login
