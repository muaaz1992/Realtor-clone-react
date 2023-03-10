import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastvisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastvisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    }
    fetchListings();
  }, []);

  async function onFetchMoreListings() {
    try {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timeStamp", "desc"),
        startAfter(lastFetchListing),

        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastvisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastvisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="font-bold mb-6 mt-6 text-3xl text-center">Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="2xl:grid-cols-5 lg:grid-cols-4 sm:grid sm:grid-cols-2">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
            <div className="flex items-center justify-center mt-6">
              <button
                onClick={onFetchMoreListings}
                className="bg-[#4287f5] duration-150 ease-in-out font-semibold hover:bg-[#5290f2] hover:shadow-lg px-6 py-3 rounded shadow-sm text-sm text-white transition uppercase"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no listings available</p>
      )}
    </div>
  );
}
