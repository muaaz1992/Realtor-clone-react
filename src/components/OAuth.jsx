import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import {FcGoogle} from "react-icons/fc"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    
    // Check for the Pre Existing User
    
    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)
     if(!docSnap.exists()){
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
      })
     }
     toast.success("Sign up Successful");
     navigate("/");
  } catch (error) {
    toast.error("Could not Authorize with Google")
  }
}
  
 
  
  return (
    <button  type="button" onClick={onGoogleClick} className='active-bg-red-900 active-shadow-lg bg-red-700 duration-150 ease-in-out flex font-md hover:bg-red-800 hover:shadow-lg items-center justify-center px-7 py-3 rounded shadow-md text-sm text-white transition uppercase w-full'>
        <FcGoogle className='bg-white mr-2 rounded-full text-2xl'/>
        Continue with Google
    </button>
  )
}
