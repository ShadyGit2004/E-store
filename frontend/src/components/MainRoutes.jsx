import {Routes, Route, Navigate} from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Product from '../pages/Product'
import LogoutButton from '../pages/LogoutButton'

const MainRoutes = () => {
  return (
    <Routes>     
      <Route path='/profile' element={<Profile/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/logout' element={<LogoutButton/>} />
      
      <Route path='*' element={<Navigate to="/products"/>} />
    </Routes>
  )
}

export default MainRoutes
