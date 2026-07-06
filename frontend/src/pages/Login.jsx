import { useContext, useState } from 'react';
import axios from '../api/axios.config'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DataContext } from '../context/DataContext';

const Login = () => {
  
  const {setUser} = useContext(DataContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
   try {
      e.preventDefault();
      const {data} = await axios.post("/auth/login", formData)
      setUser(data.user)
      toast.success("Logged in successfully")
      navigate("/profile")
   } catch (e) {
      toast.error(e.message)
   }    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h2>
        <p className="text-center text-blue-200 mb-6">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-blue-200">
          Don't have an account?
          <span onClick={()=>navigate("/register")} className="text-blue-200 cursor-pointer ml-1">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;