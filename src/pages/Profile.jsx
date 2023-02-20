import { getAuth } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [formData, setFormData]= useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  
  const {name, email} = formData
  function onLogout(){
    auth.signOut()
    navigate("/");
  }
  return (
    <section className="flex flex-wrap items-center justify-center max-w-6xl mx-auto">
      <h1 className="font-bold mt-6 text-3xl text-center" >My Profile</h1>
    <div className="md:w-[50%] mt-6 px-3 w-full">
      <form>

        {/* Name Input */}
        <input className="
            w-full
            px-4
            py-2
            text-xl
            text-gray-700
            bg-white
            border-gray-300
            hover:border-red-600
            rounded
            transition ease-in-out
            mb-6

            "
            type="text" 
            id="name"  
            value={name}
            disabled
              />

          {/*Email Input  */}
          <input className="
             w-full
             px-4
             py-2
             text-xl
             text-gray-700
             bg-white
             border-gray-300
             hover:border-red-600
             rounded
             transition ease-in-out
             mb-6
 
           "
            type="email" 
            id="email"  
            value={email}
            />

            <div className="flex justify-between mb-6 sm:text-lg text-sm whitespace-nowrap">
              <p className="flex items-center">Do you want to Change your Name and Email 
              <span className="cursor-pointer duration-200 ease-in-out hover:text-red-700 ml-2 text-red-600 transition">Edit</span></p>
              <p onClick={onLogout} className="cursor-pointer duration-200 ease-in-out hover:text-blue-800 text-blue-600 transition">Sign Out</p>
            </div>
      </form>
    </div>
    </section>
    
  )
}
