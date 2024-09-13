
import axios from "axios"
import { StoreContext } from "../../Context/StoreContext"
import "./Placefolder.css"
import { useContext,  useEffect,  useState } from "react"
import { useNavigate } from "react-router-dom"

 function Plcaefolder() {

  // import token foodlist cart item for payment integration
  const{ getTotalprice,token,food_list,cardItem,url}= useContext(StoreContext)


  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pinCode:"",
    country:"",
    phone:"",

  })
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value}));
  }
  // for verify  data come from form to data 
  // useEffect(()=>{
  //   console.log(data)
  // },[data])

//  after procced payment redirect to payment getway
  const placeOrder = async(event)=>{
        event.preventDefault();
        let orderItems = [];
//         console.log('food_list:', food_list);
// console.log('cardItem:', cardItem);

        food_list.map((item)=>{
          
            if(cardItem[item._id]>0){
              let itemInfo = item; // make a object
              itemInfo["quantity"] = cardItem[item._id];  // add quantity property in iteminfo kitna item select hai
              orderItems.push(itemInfo);
            }
        })
        // console.log(orderItems)
       

        let orderData = {
          address:data,
          items:orderItems,
          amount:getTotalprice()+2,
        }
        // console.log(orderData)
        // console.log("Order Data:", orderData);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        // // send orderdata own our API
         let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}}); // call API
        // //  console.log(response)
        if(response.data.success){
        //   // console.log(response.data)
           const {session_url} = response.data;
        //   // send the  to user session_url
        //   // console.log(session_url)
          window.location.replace(session_url);
        }else{
          alert("Error")
        }
  }    
   const nevigate = useNavigate();
    useEffect(()=>{
      if(!token){
        nevigate("/cart")
      }else if(getTotalprice()===0){
        nevigate("/cart")
      }
    })
 

  return (
    //  after submit form redirect add onsubmit
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input required name ="firstName"  onChange={onChangeHandler} value={data.firstName} type="text"placeholder="First Name" />
          <input required name ="lastName"  onChange={onChangeHandler} value={data.lastName}  type="text" placeholder="Last name"/>

        </div>
        <input name ="email"  onChange={onChangeHandler} value={data.email}  type="email" placeholder="Email Address"/>
        <input name ="street"  onChange={onChangeHandler} value={data.street}  type="text" placeholder="Street" />
        <div className="multi-field">
          <input required name ="city"  onChange={onChangeHandler} value={data.city}  type="text"placeholder="City" />
          <input required name ="state"  onChange={onChangeHandler} value={data.state}  type="text" placeholder="State"/>

        </div>
        <div className="multi-field">
          <input required name ="pinCode"  onChange={onChangeHandler} value={data.pinCode}  type="text"placeholder="Pin-Code" />
          <input required name ="country"  onChange={onChangeHandler} value={data.country}  type="text" placeholder="Country"/>

        </div>
        <input required name ="phone"  onChange={onChangeHandler} value={data.phone}  type="text" placeholder="Phone" />
      </div>
         <div className="place-order-right">
         <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
            <p>Subtotal</p>

            <p>₹{getTotalprice()}</p>  {/* getTotalprice calculate total price in the card item*/}
          </div>
          <hr/>
          <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹{getTotalprice()===0?0:2}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
             <b>Total</b>
             <b>₹{getTotalprice()===0?0:getTotalprice()+2}</b>
          </div>

        </div>
        {/* for redirect to payment getway add submit on button */}
        <button type="submit" >PROCEED TO PAYMENT</button>
      </div>
         </div>
    </form>
  )
}

export default Plcaefolder