
import Navbar from './Components/Navbar/Navbar'
import Slidbar from './Components/Slidbar/Slidbar'
import "./index.css"
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //  intialise API here and pass as in  all route  due to this we not intialise url in one by one route
    const url = "http://localhost:4000"


  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-component">
        <Slidbar/>
        <Routes>
          <Route path='/add' element={<Add url ={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/order' element={<Order url={url}/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default App
