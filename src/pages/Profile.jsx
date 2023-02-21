import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react"
import { useNavigate } from "react-router"
import {db} from "../firebase";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc"
import {Link} from "react-router-dom";

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData]= useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  
  const {name, email} = formData
  function onLogout(){
    auth.signOut()
    navigate("/");
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    })
)
  }

  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        // Update Display name in Firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        //Update the name in the Firestore
          const docRef= doc(db, "users", auth.currentUser.uid)
          await updateDoc(docRef, {
            name,
          });
      }
      toast.success("Profile Details Updated Successfully");
    } catch (error) {
      toast.error("Could not Update the Profile Details");
    }
  }

  return (
    <section className="flex-wrap items-center justify-center max-w-6xl mx-auto">
      <h1 className="font-bold mt-6 text-3xl text-center" >My Profile</h1>

      <div className="md:w-[50%] mt-6 px-3 w-full">
        <form>

        {/* Name Input */}
        <input className={`bg-white border-gray-300 ease-in-out hover:border-red-600 mb-6 px-4 py-2 rounded text-gray-700 text-xl transition w-full ${changeDetails && "bg-red-200 focus:bg-red-200"}`}
            type="text" 
            id="name"  
            value={name}
            disabled={!changeDetails}
            onChange={onChange}
              />

          {/*Email Input  */}
          <input className="bg-white border-gray-300 ease-in-out hover:border-red-600 mb-6 px-4 py-2 rounded text-gray-700 text-xl transition w-full"
            type="email" 
            id="email"  
            value={email}
            disabled={!changeDetails}
            onChange={onChange}
            />

            <div className="flex justify-between mb-6 sm:text-lg text-sm whitespace-nowrap">
              
            <p className="flex items-center">Do you want to Change your Name and Email 
             
             <span onClick={()=>{
              changeDetails && onSubmit()
             
             setChangeDetails((prevState) => !prevState);
            }}
              className="cursor-pointer duration-200 ease-in-out hover:text-red-700 ml-2 text-red-600 transition">{changeDetails ? "Apply Change" : "Edit"}</span></p>
              
              <p onClick={onLogout} className="cursor-pointer duration-200 ease-in-out hover:text-blue-800 text-blue-600 transition">Sign Out</p>
            </div>
        </form>
        <Link to="/create-listing">
          <button className="active:bg-blue-800 bg-blue-600 duration-150 ease-in-out flex font-md hover:bg-blue-700 hover:shadow-lg items-center justify-center px-7 py-3 rounded shadow-md text-sm text-white transition uppercase w-full" type="submit">
            <FcHome className="bg-red-200 border-2 mr-3 p-1 rounded-full text-3xl"/>
            Sell or Rent
          </button>
        </Link>
      </div>
    </section>
    
  )
}
