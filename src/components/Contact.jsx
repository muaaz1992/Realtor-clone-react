import { doc, getDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function getLandLord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandLord();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mb-6 mt-3">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="bg-white border border-gray-300 duration-200 focus:bg-white focus:border-slate-600 focus:text-gray-700 hover:border-red-700 in-and-out px-4 py-2 rounded text-gray-700 text-xl transition w-full"
            ></textarea>
          </div>
          <a
            href={`mailto: ${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button
              type="button"
              className="bg-blue-600 duration-150 ease-in-out font-medium hover:bg-blue-700 hover:shadow-lg items-center mb-6 py-3 rounded shadow-md text-center text-sm text-white transition uppercase w-full"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
