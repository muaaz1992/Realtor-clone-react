import {useLocation, useNavigate} from "react-router-dom"; 


export default function Header() {

    const location = useLocation();
    const navigate = useNavigate();
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true
        }
     }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50" >
        <header className="flex items-center justify-between max-w-6xl mx-auto px-3" >
            <div>
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo " className="cursor-pointer h-5" onClick={()=>navigate("/")} />
            </div>
            <div>
                <ul className="flex space-x-10" >
                    <li className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b ${pathMatchRoute("/") && "text-black border-b-red-500"}`} onClick={()=>navigate("/")} >Home</li>

                    <li className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`} onClick={()=>navigate("/offers")} >Offers</li>

                    <li className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b ${pathMatchRoute("/sign-in") && "text-black border-b-red-500"}`} onClick={()=>navigate("/sign-in")} >Sign In</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
