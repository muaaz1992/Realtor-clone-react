import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
  const [pageState, setPageState] = useState("Sign in");
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  function onClickHome() {
    setIsNavOpen((prev) => !prev);
    navigate("/");
  }
  function onClickOffers() {
    setIsNavOpen((prev) => !prev);
    navigate("/offers");
  }
  function onClickProfile() {
    setIsNavOpen((prev) => !prev);
    navigate("/profile");
  }

  const location = useLocation();
  const navigate = useNavigate();
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex items-center justify-between max-w-6xl mx-auto px-3">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo "
            className="cursor-pointer h-5"
            onClick={() => navigate("/")}
          />
        </div>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON py-4 space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              <span className="animate-pulse bg-gray-600 block h-0.5 w-8"></span>
              <span className="animate-pulse bg-gray-600 block h-0.5 w-8"></span>
              <span className="animate-pulse bg-gray-600 block h-0.5 w-8"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              {" "}
              <div
                className="CROSS-ICON absolute px-8 py-8 right-0 top-0"
                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 text-gray-600 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className="MENU-LINK-MOBILE-OPEN">
                <ul className="flex flex-col items-center justify-between min-h-[250px] my-auto">
                  <li
                    onClick={onClickHome}
                    // onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
                    className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-lg font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                      pathMatchRoute("/") && "text-black border-b-red-500 "
                    }`}
                  >
                    Home
                  </li>

                  <li
                    className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-lg font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                      pathMatchRoute("/offers") && "text-black border-b-red-500"
                    }`}
                    onClick={onClickOffers}
                  >
                    Offers
                  </li>

                  <li
                    className={`
                  hover:border-b-red-300 hover:text-gray-300
                  transition duration-200 ease-in-out
                  cursor-pointer py-3
                  text-lg font-semibold text-gray-400 border-b-[3px] border-b-transparent
                  ${
                    (pathMatchRoute("/sign-in") ||
                      pathMatchRoute("/profile")) &&
                    "text-black border-b-red-500"
                  }`}
                    onClick={onClickProfile}
                  >
                    {pageState}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="DESKTOP-MENU hidden lg:flex space-x-10">
            <ul className="flex space-x-10">
              <li
                onClick={() => navigate("/")}
                className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute("/") && "text-black border-b-red-500 "
                }`}
              >
                Home
              </li>

              <li
                className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute("/offers") && "text-black border-b-red-500"
                }`}
                onClick={() => navigate("/offers")}
              >
                Offers
              </li>

              <li
                className={`
                  hover:border-b-red-300 hover:text-gray-300
                  transition duration-200 ease-in-out
                  cursor-pointer py-3
                  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent
                  ${
                    (pathMatchRoute("/sign-in") ||
                      pathMatchRoute("/profile")) &&
                    "text-black border-b-red-500"
                  }`}
                onClick={() => navigate("/profile")}
              >
                {pageState}
              </li>
            </ul>
          </div>
        </nav>
        <style>{`
          .hideMenuNav {
            display: none;
          }
          .showMenuNav {
            display: block;
            position: absolute;
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
            background: white;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
          }
        `}</style>
      </header>
    </div>
  );

  // <div className="bg-white border-b shadow-sm sticky top-0 z-40">
  //   <header className="flex items-center justify-between max-w-6xl mx-auto px-3">
  //     <div>
  //       <img
  //         src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
  //         alt="logo "
  //         className="cursor-pointer h-5"
  //         onClick={() => navigate("/")}
  //       />
  //     </div>
  //     <div>
  //       <ul className="flex space-x-10">
  //         <li
  //           onClick={() => navigate("/")}
  //           className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
  //             pathMatchRoute("/") && "text-black border-b-red-500 "
  //           }`}
  //         >
  //           Home
  //         </li>

  //         <li
  //           className={`hover:border-b-red-300 hover:text-gray-300 transition duration-200 ease-in-out cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
  //             pathMatchRoute("/offers") && "text-black border-b-red-500"
  //           }`}
  //           onClick={() => navigate("/offers")}
  //         >
  //           Offers
  //         </li>

  //         <li
  //           className={`
  //                 hover:border-b-red-300 hover:text-gray-300
  //                 transition duration-200 ease-in-out
  //                 cursor-pointer py-3
  //                 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent
  //                 ${
  //                   (pathMatchRoute("/sign-in") ||
  //                     pathMatchRoute("/profile")) &&
  //                   "text-black border-b-red-500"
  //                 }`}
  //           onClick={() => navigate("/profile")}
  //         >
  //           {pageState}
  //         </li>
  //       </ul>
  //     </div>
  //   </header>
  // </div>
}
