import { useState } from 'react'
import Login from './pages/login/login'
import './App.css'
import Footer from './pages/footer/Footer'
import Tpp from './pages/tpp/tpp'
import Navbar from './Components/Navbar/Navbar'
import Home from './pages/home/home'
import Theory from './pages/theory/theory'
import Practical from './pages/practical/practical'
import About from './pages/about/about'
import Register from './pages/register/register'
import AdminDashboard from './pages/adminpanel/dashboard'
import Previous from './pages/previous papers/previous'
import { Routes,Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <><Navbar/>
    <Routes>
      <Route path='/theory' element={<Theory/>}/>
      <Route path='/practical' element={<Practical/>}/>
      <Route path='/previous' element={<Previous/>}/>
      <Route path='/addmaterial' element={<AdminDashboard/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/tpp' element={<Tpp/>}/>
    </Routes>
      
    
   <Footer/>
      
    </>
  )
}

export default App
