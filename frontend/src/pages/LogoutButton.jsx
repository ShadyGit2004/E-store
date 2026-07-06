import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.config";
import {toast} from "react-toastify"
import { DataContext } from "../context/DataContext";

const LogoutButton = () => {
  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const {data} = await axios.get("/auth/logout"); 
      setUser(null);
      toast.success(data.message)
      navigate("/");
    } catch (err) {
      toast.error(err)
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;