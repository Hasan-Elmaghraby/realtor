import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import axios from "axios";
import { Spinner } from "../components/shared/Spinner";
import { ListingItem } from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [changeDetail, setChangeDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser?.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      const docRef = doc(db, "users", auth.currentUser?.uid!);
      await updateDoc(docRef, {
        name,
      });
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  useEffect(() => {
    async function fetchUserListings() {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3001/listings?userId=${user.uid}`
          );
          const userListings = response.data.filter(
            (item: any) => item.userId === user.uid
          );
          setListings(userListings);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user listings:", error);
        }
      } else {
        console.log("User not logged in");
      }
    }

    fetchUserListings();
  }, [user]);

  const onDelete = async (listingId: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`http://localhost:3001/listings/${listingId}`);
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Listing deleted");
    }
  };

  const onEdit = (listingId: string) => navigate(`/edit-listing/${listingId}`);

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
          />
          <input
            type="email"
            id="email"
            value={email}
            disabled={!changeDetail}
            onChange={onChange}
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"
          />

          <div className="flex justify-between whitespace-nowrap text-sm sm:tex-lg mb-6">
            <p className="flex items-center  ">
              Do you want to change your name?{" "}
              <span
                onClick={onEdit}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p
              onClick={onLogout}
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer "
            >
              Sign out
            </p>
          </div>
        </form>
        <button
          type="submit"
          className="flex justify-center items-center w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          <Link
            to="/create-listing"
            className="flex items-center justify-center "
          >
            <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
          </Link>
          Sell or rent your home
        </button>
      </div>

      <div className="mt-6">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Your Listings
            </h2>
            <ul className=" sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6 ">
              {listings.map((listing) =>
                listing?.id ? (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ) : (
                  <p key={Math.random()}>Listing data is missing an ID</p>
                )
              )}
            </ul>
          </>
        )}
      </div>

      {loading && <Spinner />}
    </section>
  );
};

export default Profile;
