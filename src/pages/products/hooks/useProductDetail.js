import { useQuery } from "@tanstack/react-query";
import client from "../../../utils/ApiClient";

const fetchProductById = async (id) => {
  const response = await client.get(`/products/${id}`);
  return response.data;
};

const useProductDetail = (id) => {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export { useProductDetail };
export default useProductDetail;
