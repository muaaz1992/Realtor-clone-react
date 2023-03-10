import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import ListingItem from "../components/ListingItem.jsx";
import { db } from "../firebase";

export default function Home() {
  // Offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Places for Rent
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Places for Sale
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="font-semibold mt-6 px-3 text-2xl">Recent offers</h2>
            <Link to={"/offers"}>
              <p className="duration-150 ease-in-out hover:text-blue-800 px-3 text-blue-600 text-sm transition">
                Show more offers
              </p>
            </Link>
            <ul className="lg:grid-cols-3 mt-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="font-semibold mt-6 px-3 text-2xl">
              Places for Rent
            </h2>
            <Link to={"/category/rent"}>
              <p className="duration-150 ease-in-out hover:text-blue-800 px-3 text-blue-600 text-sm transition">
                Show more places for rent
              </p>
            </Link>
            <ul className="lg:grid-cols-3 mt-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="font-semibold mt-6 px-3 text-2xl">
              Places for Sale
            </h2>
            <Link to={"/category/sale"}>
              <p className="duration-150 ease-in-out hover:text-blue-800 px-3 text-blue-600 text-sm transition">
                Show more places for sale
              </p>
            </Link>
            <ul className="lg:grid-cols-3 mt-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
