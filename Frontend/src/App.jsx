
import Navbar from './components/navbar/Navbar'
//  import Navbar from './components/navbar/Navbar.jsx'
import{Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Card from './pages/Card/Card'
import Plcaefolder from './pages/PlaceOrder/Plcaefolder'
import Footer from './components/Footer/Footer'
import Appdownload from './components/AppDownload/Appdownload'
import { useState } from 'react'
import Login from './components/Login/Login'
import Verify from './pages/Verify/Verify'
import Myorder from './pages/Myorder/Myorder'

const App = () => {

  const[showlogin,setShowlogin] = useState(false)
  return (
     <>
     {showlogin?<Login setShowlogin={setShowlogin}/>:<></>}
    <div className='app'>
       <Navbar setShowlogin={setShowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Card/>}/>
        <Route path='/order' element={<Plcaefolder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<Myorder/>}/>
      </Routes>   
    </div>
    <Appdownload/>
    <Footer/>
     </>
  )
}

export default App
