import React, { ChangeEvent, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const Contact = ({ listing }) => {
  const auth = getAuth();

  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    async function getLanddlord() {
      const docRef = await auth.currentUser;

      setLandlord(docRef);
    }
    getLanddlord();
  }, [auth.currentUser]);
  return (
    <div>
      {landlord !== null && (
        <div className="flex flex-col w-full mt-6">
          <p className="">
            Contact {landlord.email} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows={2}
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bgy-whit border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            />
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button className="px-7 py-3 bg-blue-500 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg cursor-pointer transition duration-150 ease-in-out w-full text-center mb-6">
              Send Message
            </button>
          </a>
        </div>
      )}
    </div>
  );
};
