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
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import "swiper/css";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId, listing]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        module={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map(({ url, index }) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls}) center, no-repeat`,
                backgroundSize: "cover",
              }}
              className="h-[300px] overflow-hidden w-full"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <img
        src={listing.imgUrls[0]}
        alt="Images"
        className="h-[400px] object-cover overflow-hidden w-full"
      /> */}
      <div
        className="bg-white border-2 border-gray-400 cursor-pointer fixed flex h-12 items-center justify-center ml ml-6 right-[3%] rounded-full top-[10%] w-12 z-10"
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
        <p className="bg-white border-2 border-gray-400 fixed font-semibold p-2 right-[5%] rounded-md top-[13%] z-10">
          Link Copied
        </p>
      )}
      <div className="bg-white border-3 border-slate-400 flex flex-col lg lg:mx-auto lg:space-x-5 max-w-6xl md:flex-row mt-6 p-4 rounded-lg shadow-lg sm:flex-row">
        <div className="h-auto w-full">
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
            <p className="bg-red-800 font-semibold max-w-[200px] p-1 px-12 rounded-md shadow-md text-center text-white w-full">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            <p>
              {listing.offer && (
                <p className="bg-green-800 font-semibold max-w-[200px] p-1 px-12 rounded-md shadow-md text-center text-white w-full">
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
          <ul className="flex items-center lg:space-x-10 max-w-lg mb-6 space-x-5">
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaBed className="mr-1 text-lg" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaBath className="mr-1 text-lg" />
              {+listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </li>
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaParking className="mr-1 text-lg" />
              {listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex font-semibold items-center text-sm whitespace-nowrap">
              <FaChair className="mr-1 text-lg" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div>
              <button
                onClick={() => {
                  setContactLandlord(true);
                }}
                className="bg-blue-600 duration-150 ease-in-out font-medium hover:bg-blue-700 hover:shadow-lg items-center py-3 rounded shadow-md text-center text-sm text-white transition uppercase w-full"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="h-[200px] lg:h-[400px] lg:mt-0 md:ml-3 overflow-x-hidden w-full z-10">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
