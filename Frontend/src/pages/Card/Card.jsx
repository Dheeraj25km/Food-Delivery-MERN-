import { useContext } from "react"
// import {StroreContext} from '../../context/StroreContext'
import { StoreContext } from "../../Context/StoreContext";
import "./Card.css"
import { useNavigate } from "react-router-dom";
 function Card() {
   
  const {cardItem,food_list,removeFromCart,getTotalprice,url} = useContext(StoreContext)
  
  const nevigate = useNavigate();


  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-tittle">
            <p>Items</p>
            <p>Tittle</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <br/>
        <hr/>
         {food_list.map((item,index)=>{
            // console.log(cardItem)
          //  console.log(cardItem[item]); 
         //   when item show in cart when i click on carditem increse or decrese
            if(cardItem[item._id]>0){
              return(
                // console.log({item})
                <div key={index}>
                <div  className="cart-item-tittle cart-item-item">
                  <img src={url+"/images/"+item.image} alt="" />  {/*url+"/images/"   use for load image from backend*/}
                 <p>{item.name}</p>
                 <p>{item.price*20}</p>
                 <p>{cardItem[item._id]}</p>
                 <p>{item.price*20*cardItem[item._id]}</p>
                 <p onClick={()=>removeFromCart(item._id)} className="cros">x</p>
                </div>
                <hr/>
                </div>
              )
            }
         })}
      </div>
      <div className="cart-button">
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
        <button onClick={()=>nevigate("/order")}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If you have a promo code,Enter it here</p>
          <div className="cart-promocode-item">
            <input type="text" placeholder="promo-code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default Card