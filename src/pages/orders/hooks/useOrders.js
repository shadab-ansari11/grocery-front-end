import { useQuery } from "@tanstack/react-query";
import client from "../../../utils/ApiClient";

const fetchUserOrders = async (userId) => {
  const response = await client.get(`/orders/user/${userId}`);
  return response.data;
};

const useOrders = (userId) => {
  const query = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchUserOrders(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    orders: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export { useOrders };
export default useOrders;
