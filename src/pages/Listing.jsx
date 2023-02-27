import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import {
  FaMapMarkerAlt,
  FaShare,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        console.log(listing);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <img
        src={listing.imgUrls[0]}
        alt="Images"
        className="h-[300px] object-cover overflow-hidden w-full"
      />
      <div
        className="bg-white border-2 border-gray-400 cursor-pointer fixed flex h-12 items-center justify-center ml ml-6 right-[10%} rounded-full top-[13%] w-12 z-10"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);

          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="bg-white border-2 border-gray-400 fixed font-semibold left-[10%] p-2 rounded-md top-[20%] z-10">
          Link Copied
        </p>
      )}
      <div className="bg-white border-3 border-slate-400 flex flex-col lg lg:mx-auto lg:space-x-5 max-w-6xl md:flex-row mt-6 p-4 p-4 rounded-lg shadow-lg sm:flex-row">
        <div className="h-[200px] lg:h-[400px] w-full">
          <p className="font-bold mb-3 text-2xl text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discounted
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex font-semibold items-center mb-3 mt-6">
            <FaMapMarkerAlt className="mr-1 text-green-700" />
            {listing.address}
          </p>
          <div className="flex items-center justify-start space-x-4 w-[75%]">
            <p className="bg-red-800 font-semibold max-w-[200px] p-1 rounded-md shadow-md text-center text-white w-full">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            <p>
              {listing.offer && (
                <p className="bg-green-800 font-semibold max-w-[200px] p-1 rounded-md shadow-md text-center text-white w-full">
                  {((+listing.price - +listing.discounted) / listing.price) *
                    100}
                  % discount
                </p>
              )}
            </p>
          </div>

          <p className="mb-3 mt-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center lg:space-x-10 space-x-5">
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaBed className="mr-1 text-lg" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaBath className="text-lg" />
              {+listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </li>
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaParking className="text-lg" />
              {listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaChair className="text-lg" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
        </div>
        <div className="bg-blue-300 h-[200px] lg:h-[400px] overflow-x-hidden w-full z-10"></div>
      </div>
    </main>
  );
}
