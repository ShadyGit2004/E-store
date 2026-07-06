import "../src/index.css"
import MainRoutes from "./components/MainRoutes.jsx"
import Navbar from "./components/Navbar.jsx"

const App = () => {
  return (
    <div className='h-screen overflow-auto text-white bg-blue-800'> 
      <Navbar/>
      <MainRoutes/>
    </div>
  )
}

export default App
