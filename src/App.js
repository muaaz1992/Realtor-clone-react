import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Offers from "./pages/Offers.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import { ToastContainer } from "react-toastify";
import"react-toastify/dist/ReactToastify.css";
import CreateListing from "./pages/CreateListing.jsx";


function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/create-listing" element={<CreateListing />} />
          
          <Route path="/profile" element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
          </Route>
          
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />    
    </div>
  );
}

export default App;
