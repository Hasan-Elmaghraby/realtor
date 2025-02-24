import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import classNames from "classnames";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMathRoute = (route: string) => {
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
              ${pathMathRoute("/") && "!text-black !border-b-red-500"}`}
              onClick={() => navigate("/")}
            >
              home
            </li>
            <li
              className={`${classes} ${
                pathMathRoute("/offers") && "!text-black !border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              offers
            </li>
            <li
              className={`${classes} ${
                pathMathRoute("/sign-in") && "!text-black !border-b-red-500"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};
