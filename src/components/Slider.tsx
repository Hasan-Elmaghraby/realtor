import React, { useEffect } from "react";
import axios from "axios";
import { Spinner } from "./../components/shared/Spinner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router";

export const Slider = () => {
  const [listings, setListings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await axios("http://localhost:3001/listings");
        setListings(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return (
      <div>
        <h1 className="text-3xl text-center mt-6 font-bold">No Listings</h1>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        {listings.map((listing) => (
          <SwiperSlide
            key={listing.id}
            onClick={() => navigate(`/category/${listing.type}/${listing.id}`)}
          >
            <div className="relative">
              <img
                src={listing.images[0]}
                alt={listing.name}
                className="w-full h-[300px] object-cover"
              />
              <p className="absolute top-1 left-1 bg-red-600 text-white uppercase font-medium p-2 rounded-md shadow-lg">
                $
                {listing.offer ? listing.discountedPrice : listing.regularPrice}
                {listing.type === "rent" && " / Month"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
