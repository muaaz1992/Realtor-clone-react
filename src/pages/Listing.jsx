import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { FaShare } from "react-icons/fa";

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
        src={listing.imgUrls[2]}
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
    </main>
  );
}
