import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/shared/Spinner";
import { FaShare } from "react-icons/fa";
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
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
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
    </main>
  );
}

export default Listing;
