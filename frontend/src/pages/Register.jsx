import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.config";
import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

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
      const {data} = await axios.post("/auth/register", formData)
      toast.success(data.message)
      navigate("/login")
    } catch (err) {
      toast.error(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account 
        </h2>

        <p className="text-center text-blue-300 mb-6">
          Register to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-blue-300">
          Already have an account?
          <span onClick={()=>navigate("/login")} className="cursor-pointer ml-1">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

