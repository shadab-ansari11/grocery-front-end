import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import client from "../../../utils/ApiClient";

const createOrder = async (orderData) => {
  const response = await client.post("/orders", orderData);
  return response.data;
};

const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (response) => {
      toast.success("Order placed successfully!");
      // Invalidate orders query to refetch
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      return response;
    },
    onError: (err) => {
      console.error("Order error:", err);
      toast.error(
        err?.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    },
  });

  const placeOrder = async (orderData) => {
    return mutation.mutateAsync(orderData);
  };

  return {
    placeOrder,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export { useCreateOrder };
export default useCreateOrder;
