import React from 'react'
import './Footer.css';
import {assets} from '../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
    <div className="footer-item">
      <div className="footer-item-first">
         <img src={assets.logo} alt="" />
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero corporis eligendi veritatis, maxime fugit corrupti molestiae dolore facilis laudantium earum sit commodi non. Provident reiciendis mollitia voluptatem, aspernatur tempore animi?</p>
         <div className='footer-item-icon'>
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
         </div>
      </div>
      <div className="footer-item-second">
        <h2>COMPANY</h2>
         <ul>
          <li>Home</li>
          <li>About us</li>
          <li> Delivery</li>
          <li>Privacy policy</li>
         </ul>
      </div>
      <div className="footer-item-third">
       <h2>GET IN TOUCH</h2>
       <ul>
        <li>+91-7563980038</li>
        <li>contact@gmail.com</li>
       </ul>
      </div>
    </div>
    <hr/>
    <p className="p footer-copyright">
       Copyright 2024 @ Tomato.com -All Right Reserved.
    </p>
    </div>
  )
}

export default Footer
