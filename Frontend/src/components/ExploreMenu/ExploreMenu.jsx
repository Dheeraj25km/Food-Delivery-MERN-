import React from 'react'
import "./EploreMenu.css"
import {menu_list} from '../../assets/assets'
function ExploreMenu({category,SetCategory}) {


  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam nihil nemo officiis asperiores, ex, debitis minima accusamus placeat assumenda expedita nulla sunt quia iste ducimus sit aperiam, error et. Obcaecati.</p>
        <div className="explore-menu-list">

             {/* yaha se munu list per iterate kar ke ek element 
             ko display kara rahe hai thriugh map fun se */}
            {menu_list.map((item,index)=>{
              return(
               // eslint-disable-next-line react/jsx-key

               <div onClick={()=>SetCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}className="explore-menu-list-item">

                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                
                <p>{item.menu_name}</p>                                                                      
               </div>
              )
            })
        }
        </div>
       <hr/>
    </div>
  )
}
export default ExploreMenu