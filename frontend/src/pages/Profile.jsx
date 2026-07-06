import { useContext } from "react"
import { DataContext } from "../context/DataContext"

const Profile = () => {
  const {user} = useContext(DataContext)

  return (   
     <div className="flex items-center justify-center p-4">
      { user ? 
      <div className="bg-white shadow-md rounded-xl px-6 py-4 border border-gray-200 hover:shadow-lg transition">
       <h2 className="text-sm text-gray-500">Username</h2>
        <p className="text-xl font-semibold text-gray-800 mt-1">
          {user?.username} <small className="ml-auto">({user?.role})</small>
        </p>
       {user?.createdAt && <small className="text-sm font-medium text-gray-800 mt-1">joined at {new Date(`${user?.createdAt}`).toDateString()}</small>}
      </div>
      : "Loading..."}       
    </div>
  )
}

export default Profile
