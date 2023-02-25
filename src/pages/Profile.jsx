import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update Display name in Firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //Update the name in the Firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile Details Updated Successfully");
    } catch (error) {
      toast.error("Could not Update the Profile Details");
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section className="flex-wrap items-center justify-center max-w-6xl mx-auto">
        <h1 className="font-bold items-center justify-center mt-6 text-3xl text-center">
          My Profile
        </h1>

        <div className="items-center lg:w[50%] md:w[67%] mt-6 px-3 sm:w[75%] w-full">
          <form>
            {/* Name Input */}
            <input
              className={`bg-white border-gray-300 ease-in-out hover:border-red-40 mb-6 px-4 py-2 rounded text-gray-700 text-xl transition w-full ${
                changeDetails && "bg-red-200 focus:bg-red-200"
              }`}
              type="text"
              id="name"
              value={name}
              disabled={!changeDetails}
              onChange={onChange}
            />

            {/*Email Input  */}
            <input
              className="bg-white border-gray-300 ease-in-out hover:border-red-400 mb-6 px-4 py-2 rounded text-gray-700 text-xl transition w-full"
              type="email"
              id="email"
              value={email}
              disabled={!changeDetails}
              onChange={onChange}
            />

            <div className="flex justify-between mb-6 sm:text-lg text-sm whitespace-nowrap">
              <p className="flex items-left">
                Do you want to Change your Name and Email
                <span
                  onClick={() => {
                    changeDetails && onSubmit();

                    setChangeDetails((prevState) => !prevState);
                  }}
                  className="cursor-pointer duration-200 ease-in-out hover:text-red-700 ml-2 text-red-600 transition"
                >
                  {changeDetails ? "Apply Change" : "Edit"}
                </span>
              </p>

              <p
                onClick={onLogout}
                className="cursor-pointer duration-200 ease-in-out hover:text-blue-800 text-blue-600 transition"
              >
                Sign Out
              </p>
            </div>
          </form>

          <button
            className="active:bg-blue-800 bg-blue-600 duration-150 ease-in-out flex font-md hover:bg-blue-700 hover:shadow-lg items-center justify-center px-7 py-3 rounded shadow-md text-sm text-white transition uppercase w-full"
            type="submit"
          >
            <Link
              to="/create-listing"
              className="flex items-center justify-center"
            >
              <FcHome className="bg-red-200 border-2 mr-3 p-1 rounded-full text-3xl" />
              Sell or Rent your Home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6x mt-6 mx-auto px-3">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="font-semibold mt-6 text-2xl text-center">
              My Listings
            </h2>
            <ul>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
