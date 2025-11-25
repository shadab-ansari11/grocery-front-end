import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { register as registerAPI } from "../../../../services/auth.service";
import { setUserCredential } from "../../../../redux/authSlice";

const useRegister = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: registerAPI,
    onSuccess: (response) => {
      if (response) {
        // Dispatch to Redux with new action
        dispatch(
          setUserCredential({
            userInfo: response.user,
            token: response.token,
            role: response.user?.role || "user",
          })
        );

        // Store in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        toast.success("Registration successful!");
        return response;
      } else {
        toast.error("Registration failed.");
        return null;
      }
    },
    onError: (err) => {
      console.error("Register error:", err);
      toast.error(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    },
  });

  const tryRegister = async (values) => {
    return mutation.mutateAsync(values);
  };

  return {
    tryRegister,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export { useRegister };
export default useRegister;
