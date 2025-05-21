import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../store/slices/authSlice";

const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if we have a token and try to fetch the user profile
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AuthCheck;
