import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const Header = () => {
  const [pageState, setPageState] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);
  const pathMatchRoute = (route: string) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const classes = classNames(
    "cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent"
  );

  return (
    <div className="bg-white border-b-0 shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={logo}
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`${classes}
              ${pathMatchRoute("/") && "!text-black !border-b-red-500"}`}
              onClick={() => navigate("/")}
            >
              home
            </li>
            <li
              className={`${classes} ${
                pathMatchRoute("/offers") && "!text-black !border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              offers
            </li>
            <li
              className={`${classes} ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "!text-black !border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};
