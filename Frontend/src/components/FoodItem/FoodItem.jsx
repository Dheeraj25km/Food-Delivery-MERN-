import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
function FoodItem({data}) {
   
const {_id,name,price,description,image} = data;
    // *** Handle count part in card increse of decrese food selection********
      
      
    
       const {cardItem,AddtoCard,removeFromCart,url} = useContext(StoreContext)  //


  return (
    <div className='food-item'>
       <div className="food-item-container">
        {/* <img className='food-item-img' src={image} alt="" /> */}
        <img className='food-item-img' src={url+"/images/"+image} alt="" />  {/*this type for come images from backend*/}
        {!cardItem[_id]
         ?(<img className='add' onClick={()=>AddtoCard(_id)} src={assets.add_icon_white} alt="" />)
          :(<div className='food-item-coun'>
           <img onClick={()=>removeFromCart(_id)} src={assets.remove_icon_red} alt="" />
           <p>{cardItem[_id]}</p>
           <img onClick={()=>AddtoCard(_id)} src={assets.add_icon_green} alt="" />

         </div>)
      }
       </div>
       <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">₹{price *20}</p>
       </div>
    </div>
  )
}

export default FoodItem
