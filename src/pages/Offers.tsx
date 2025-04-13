import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../components/shared/Spinner";
import { ListingItem } from "../components/ListingItem";

const Offers = () => {
  const [offerListings, setOfferListing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await axios("http://localhost:3001/listings");
        setOfferListing(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch offers");
      }
    }
    fetchListings();
  });

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      {offerListings && offerListings.length > 0 && (
        <div className="max-w-6xl mx-auto pt-4 space-y-6">
          <h2 className="text-2xl text-center font-semibold mt-6 mb-3">
            Offers
          </h2>

          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {offerListings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing}
                // onDelete={() => {}}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Offers;
