import React from 'react'
import {useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'



function FoodDisplay({category}) {

 const {food_list}= useContext(StoreContext)


  return (
    <div className='food-display' id='food-display'>
       <h2>Top Dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item,index)=>{
            // console.log({item})
             if(category==="All" || category===item.category){  
              return <FoodItem  key={index} data={item} />
             }
           // using if jisase particular item from {Explore Our Menu }per click karenge to usake related sab product show ho jayega for ex. {Salad}
            
            // console.log(item);
             
        })}
       
      </div>
    </div>
  )
}

export default FoodDisplay
