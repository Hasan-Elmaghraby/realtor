import { Navigate, Outlet } from "react-router";
import useAuthStatus from "../hooks/useAuthStatus";
import { Spinner } from "./shared/Spinner";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) return <Spinner />;

  return loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />;
};
