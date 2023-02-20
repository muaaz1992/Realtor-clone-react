import { useState } from "react"
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {

  const [ email, setEmail ] = useState("");

  function onChange(e){
     setEmail(e.target.value)
  }
  

  return (
    <section>
      <h1 className="font-bold mt-6 text-3xl text-center" >Sign in</h1>

      <div className="flex flex-wrap items-center justify-center max-w-6xl mx-auto px-6 py-12" >

        <div className="lg:mb-12 lg:w-[50%] md:mb-6 md:w-[67%]" >

          <img src="https://images.unsplash.com/photo-1572782992110-afab5a6ef870?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="key" 
          className="rounded-2xl w-full"/>

        </div>

        <div className="lg:ml-20 lg:w[40%] md:w-[67%] w-full">

          <form>

            <input 
            className="
            hover:border-red-400
            bg-white
            border-gray-400
            ease-in-out
            px-4
            py-2
            rounded
            text-gray-700
            text-xl transition 
            w-full
            mb-6"
            type="email" 
            id="email" 
            value={email} 
            onChange={onChange} 
            placeholder="Email address" />

            
            <div className="flex justify-between sm:text-lg text-sm whitespace-nowrap" >
              <div className="flex">
              <p className="mb-6" >Don't have an Account?</p>
              <Link to="/sign-up" className="duration-200 ease-in-out hover:text-red-700 ml-2 text-red-600 transition" >Register</Link>
              </div>

              <p>
              <Link to="/sign-in" className="duration-200 ease-in-out hover:text-blue-800 text-blue-600 transition">Sign in Instead</Link>
              </p>
            </div>

            <button 
          className="
          active:bg-blue-800 
          bg-blue-600 
          duration-150 
          ease-in-out 
          font-medium 
          hover:bg-blue-700 
          hover:shadow-lg 
          px-7 
          py-3 
          rounded 
          shadow-md 
          text-sm 
          text-white 
          transition 
          uppercase 
          w-full
          "
           type="submit">Send Password Reset</button>

        <div className="before:border-gray-300 before:border-t before:flex-1 
        after:border-gray-300 after:border-t after:flex-1
        flex 
        items-center
         my-4">
          <p className="font-semibold mx-4 text-center uppercase">Or</p>
        </div>

              <OAuth />
          </form>
          
         

        </div>
        

      </div>
    </section>
  )
}
