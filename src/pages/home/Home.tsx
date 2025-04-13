import { useEffect, useState } from "react";
import { Slider } from "../../components/Slider";
import axios from "axios";
import { ListingItem } from "../../components/ListingItem";
import { Link } from "react-router";

const Home = () => {
  //offers
  const [offerListings, setOfferListing] = useState([]);
  // const [rentalListings, setRentalListing] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await axios("http://localhost:3001/listings");
        setOfferListing(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  //rentals

  return (
    <>
      <Slider />
      <div>
        {offerListings && offerListings.length > 0 && (
          <div className="max-w-6xl mx-auto pt-4 space-y-6">
            <h2 className="text-2xl text-center font-semibold mt-6 mb-3">
              Recent Offers
            </h2>
            <Link to="/offers">
              <p className="text-blue-600 hover:text-blue-700 cursor-pointer transition duration-150 ease-in-out">
                Show more ...
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings?.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing}
                  // onDelete={() => {}}
                  // onEdit={() => {}}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
