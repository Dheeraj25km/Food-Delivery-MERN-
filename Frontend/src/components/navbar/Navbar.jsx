import React, { useContext, useState } from 'react'
 import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';



const Navbar = ({setShowlogin}) => {

    const [menu,setManu]= useState("menu");
  const {getTotalPrice,token,setToken} = useContext(StoreContext)
  
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to manage profile dropdown visibility

  const nevigate = useNavigate();
  // thid function after click on logout uset logout from login
  const logOut=()=>{
    localStorage.removeItem("token");  // remove token from localStorage
    setToken("")
    nevigate("/")  // after logout redirect on home page
  }


  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo' />
      <ul className="navbar-manu">
        {/* li processs for after click these showunderline */}
        {/* Link aur a tag after jis component per click karenge 
        us per redirect ho jayenge through a tag { scorrbar kosmooth ke liye index.css me likhe hai }          */}
        <Link to="/" onClick={()=>setManu("home")} className={menu=="home"?"active":""}>home</Link>
        <a href='#explore-menu' onClick={()=>setManu("menu")} className={menu=="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setManu("mobail-app")}className={menu=="mobail-app"?"active":""}>mobail-app</a>
        <a href='#footer' onClick={()=>setManu("contact us")}className={menu=="contact us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
         <div className="navbar-search-icon">
          {/* give after click on baket redirect on cart page */}
           <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link> 
            <div className= {getTotalPrice===0?" ":"dot"}></div>
         </div>


         {/* ternary operator use for login and logout  if token hai to sign in show hogan nahi to  */}
         {!token?<button onClick={()=>setShowlogin(true)}>sign in</button>
                //  :<div className="navbar-profile">
                //      <img src={assets.profile_icon} alt="" />
                //      <ul className="nav-profile-dropdown">
                //       {/* give onclick property for if click icon redirect myOrder page  (setup myorder) */}
                //       <li onClick={()=>nevigate("/myorders")}> <img src={assets.bag_icon} alt="" /><p>Order</p> </li>
                //       <hr/>
                //       <li onClick={logOut}> <img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                //      </ul>
                //  </div>
                : (
                  <div className="navbar-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <img src={assets.profile_icon} alt="Profile" />
                    {isProfileOpen && ( // Conditionally render the dropdown menu
                      <ul className="nav-profile-dropdown">
                        <li onClick={() =>nevigate("/myorders")}> 
                          <img src={assets.bag_icon} alt="" />
                          <p>Order</p>
                        </li>
                        <hr />
                        <li onClick={logOut}>
                          <img src={assets.logout_icon} alt="" />
                          <p>Logout</p>
                        </li>
                      </ul>
                    )}
                  </div>
                )
         }
         
      </div>
    </div>
  )
}

export default Navbar
