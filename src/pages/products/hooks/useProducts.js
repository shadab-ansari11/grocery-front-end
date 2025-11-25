import { useQuery } from "@tanstack/react-query";
import client from "../../../utils/ApiClient";

const fetchProducts = async () => {
  const response = await client.get("/products");
  return response.data;
};

const useProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    products: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export { useProducts };
export default useProducts;
