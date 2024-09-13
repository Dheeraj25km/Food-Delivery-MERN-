import { createContext, useEffect, useState } from "react";
//  import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{
   
 
      // it make a lalag component banayenge jaha per bhi mathmatical operation karna hai wah aper use kar lenge
      //   Create a indivisual card for remove added card item
      // cardItem work when i click on food item increse or decrese
       const[cardItem,setCardItem]= useState({});
       const url = "http://localhost:4000" // it is used for pass api for login and register

      const AddtoCard=async (itemId)=>{
        
          if(!cardItem[itemId]){
            setCardItem((prev)=>({...prev,[itemId]:1}));
          }else{
            setCardItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
          }

         // part-shop cart functionality
          // if item select from frontend then item data show in login user data in databse
          // connect frontend part to backend
         if(token){
         await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
         }



      } 
      const removeFromCart = async (itemId)=>{
          setCardItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
      
          // part-shop cart functionality for remove selected item from database
          if(token){
            await axios.post(url+"/api/cart/remove",{itemId}, {headers:{token}}) 
          }
        }
     
      // useEffect(()=>{
      //     console.log(cardItem)
      // },[cardItem])
      
      const[token,setToken] = useState("");
      

      // calculate total price 
      const getTotalprice=()=>{
           let totalAmount=0;
           for(const item in cardItem){
            if(cardItem[item]>0){
              let itemdata =food_list.find((product)=>product._id===item);
              // console.log(itemdata)
              totalAmount+=itemdata.price*20*cardItem[item];
            }
           }
           return totalAmount;
      }

      // Display all food item through API from Backend
      const [food_list,setFood_list] = useState([]);

      const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list")
        setFood_list(response.data.data)
      } 

      // part-shop cart functionality
      // when select item and refresh selcted item count not show on cart 
      // handle this problem
       
      const loadCartData = async(token)=>{
        // call api
        const response = await axios.post(url+"/api/cart/get",{}, {headers:{token}});
        // save cartdata
        setCardItem(response.data.cartData)  // isase selected count pass ho raha hai response se extract kar jo cartItem me hai
      }


      //  after login when page refres then user are autometically logout handle this problem use this useeffect
      useEffect(()=>{
         async function loadData(){
          await fetchFoodList();
         
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))

          //  call loadCardData
          await loadCartData(localStorage.getItem("token")) //pass token after ecess
        }
      }
      loadData();

      },[])

    
      const contextValue = {
         food_list,
         cardItem,
         setCardItem,
         AddtoCard,
         removeFromCart,
         getTotalprice,
         url,
         token,setToken

      }




 return(

    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
 )
  

}
export default StoreContextProvider;

