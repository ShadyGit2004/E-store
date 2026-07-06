import { createContext, useEffect, useState } from "react";
import axios from "../api/axios.config";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

   const fetchUser = async () => {
      try {
        const { data } = await axios.get("/auth/profile");
        setUser(data.user);
      } catch (err) {
        setUser(null);
      }
    };

    useEffect(() => {
      fetchUser();
    }, []);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
