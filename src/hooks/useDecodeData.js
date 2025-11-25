import { jwtDecode } from "jwt-decode";

export const useDecodeData = () => {
  const decodeToken = (token) => {
    try {
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  return { decodeToken };
};

export default useDecodeData;
