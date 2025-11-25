import { useMemo } from "react";
import { useSelector } from "react-redux";
import useDecodeData from "./useDecodeData";

export const useUserInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const { decodeToken } = useDecodeData();

  const userInfo = useMemo(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return decodeToken(token);
    } else if (user) {
      return user;
    }
    return null;
  }, [user, decodeToken]);

  const isLoggedIn = Boolean(userInfo);
  return { userInfo, isLoggedIn };
};

export default useUserInfo;
