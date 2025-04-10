import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/shared/Spinner";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { getAuth } from "firebase/auth";
import { Contact } from "../components/Contact";

function Listing() {
  const auth = getAuth();

  const { listingId: id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  useEffect(() => {
    if (!id) return;

    async function fetchListing() {
      try {
        const res = await axios.get(`http://localhost:3001/listings/${id}`);
        setListing(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch listing:", err);
      }
    }

    fetchListing();
  }, [id]);

  if (loading || !listing) return <Spinner />;

  const images = listing.imgUrls || listing.images || [];

  return (
    <main>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        autoplay={{ delay: 3000 }}
        effect="fade"
        loop
        className="mySwiper"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px] "
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[10%] right-[3%] bg-white cursor-pointer w-12 h-12 flex justify-center items-center text-sm p-1 z-10 border border-gray-400 rounded-full "
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
        <p className="fixed top-[15%] right-[6%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-5 rounded-lg shadow-lg bg-white lg:space-x-5 ">
        <div className="w-full  lg-[400px] p-3">
          <p className="text-2xl font-bold mb-3 text-blue-900 ">
            {listing.name} - $
            {listing.ofer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / Month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p
              className="w-full  font-semibold bg-red-800 max-w-[200px] border 
              rounded-md p-1 text-white text-center shadow-md"
            >
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>

            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibol shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3 ">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semi-bold mb-6  ">
            <li className="flex items-center whitespace-nowrap gap-2">
              <FaBed className="h-5 w-5 text-black-600" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap gap-2">
              <FaBath className="h-5 w-5 text-black-600" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap gap-2">
              <FaParking className="h-5 w-5 text-black-600" />
              {listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap gap-2">
              <FaChair className="h-5 w-5 text-black-600" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {auth.currentUser &&
            listing.userId !== auth.currentUser &&
            !contactLandlord && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    setContactLandlord(true);
                  }}
                  className=" px-7 py-3 bg-blue-600 text-white font-medium  rounded text-sm uppercase shadow-md hover:shadow-lg hover:bg-blue-600 cursor-pointer focus:bg-blue-700 w-full text-center transition duration-150 ease-in-out"
                >
                  Contact landlord
                </button>
              </div>
            )}
          {contactLandlord && <Contact listing={listing} />}
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 over-flow-x-hidden"></div>
      </div>
    </main>
  );
}

export default Listing;
