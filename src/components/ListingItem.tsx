import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash, FaEdit } from "react-icons/fa";

export const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  if (!listing) return null;

  return (
    <li className="relative flex flex-col gap-2 bg-white rounded-md justify-between items-center shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link to={`/category/${listing.type}/${id}`} className="contents">
        {listing.images?.length > 0 && (
          <img
            src={listing.images[0]}
            alt={listing.name}
            className="w-full h-40 object-cover hover:scale-105 transition-scale duration-200 ease-in-out"
            loading="lazy"
          />
        )}
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
          <p className="font-semibold text-[#456bed] mt-2 ">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="">
              <p className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-3 right-2 text-red-600 cursor-pointer"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-3 right-6 text-black-600 cursor-pointer"
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
};
