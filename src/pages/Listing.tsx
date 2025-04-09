import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/shared/Spinner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function Listing() {
  const { listingId: id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
    </main>
  );
}

export default Listing;
