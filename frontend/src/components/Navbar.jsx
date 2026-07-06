import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import LogoutButton from '../pages/LogoutButton'

const Navbar = () => {
  const {user} = useContext(DataContext)
  
  return (
    <div className='bg-blue-600 py-5 px-6 flex items-center justify-between'>
        <div>RJT</div>
        <div className='flex items-center gap-5'>
            <NavLink to={'/products'}>Products</NavLink>

             {user ? <>
              <NavLink to={'/profile'}>Profile</NavLink>
              <LogoutButton/>
              </> 
             : <> 
             <NavLink to={'/register'}>Register</NavLink>  
             <NavLink to={'/login'}>Login</NavLink> 
            </>}         
        </div>
    </div>
  )
}

export default Navbar