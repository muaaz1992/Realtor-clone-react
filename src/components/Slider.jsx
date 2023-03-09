import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";

import "swiper/css";

export default function Slider() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timeStamp", "desc"), limit(5));
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
      console.log(listings);
    }
    fetchListings();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          module={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => {
                navigate(`/category/${data.type}/${id}`);
              }}
            >
              <div
                style={{
                  background: `url(${data.imgUrls}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[300px] overflow-hidden relative w-full"
              ></div>
              <p className="absolute bg-[#457b9d] font-md left-1 max-w-90% opacity-90 p-2 rounded-br-3xl shadow-lg text-[#f1faee] top-3">
                {data.name}
              </p>
              <p className="absolute bg-[#e63946] bottom-3 font-semibold left-1 max-w-90% opacity-90 p-2 rounded-tr-3xl shadow-lg text-[#f1faee]">
                $
                {data.offer
                  ? data.discounted
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {data.type === "rent" ? " / month" : ""}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
