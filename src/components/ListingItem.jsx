import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="bg-white duration-150 ease-in-out flex flex-col hover:shadow-xl items-center justify-between m-[10px] overflow-hidden relative rounded-md shadow-md transition-shadow">
      <Link className="content" to={`/category/${listing.type}/${id}`}>
        <img
          src={listing.imgUrls[0]}
          className="duration-200 ease-in-out h-[170px] hover:scale-105 object-cover transition-scale w-full"
          loading="lazy"
          alt=""
        />
        <Moment
          fromNow
          className="absolute bg-[#3377cc] font-semibold left-2 px-2 py-1 rounded-md shadow-lg text-white text-xs top-2 uppercase"
        >
          {listing.timeStamp?.toDate()}
        </Moment>
        <div className="items-left mt-[10px] w-full">
          <div className="flex items-left space-x-1">
            <MdLocationOn className="h-4 text-green-600 w-4" />
            <p className="font-semibold mb-[2px] text-gray-600 text-sm truncate">
              {listing.address}
            </p>
          </div>
        </div>
        <p className="font-semibold text-left text-xlg truncate">
          {listing.name}
        </p>
        <p className="font-semibold mt-2 text-[#457b9d]">
          ${" "}
          {listing.offer
            ? listing.discounted
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {listing.type === "rent" ? " / month" : ""}
        </p>
        <div className="flex items-center mb-[10px] mt-[10px] space-x-3">
          <div className="flex items-center space-x-1">
            <p className="font-bold text-xs">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}{" "}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <p className="font-bold text-xs">
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}{" "}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 cursor-pointer h-[14px] right-2 text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 cursor-pointer h-4 right-7"
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
}
