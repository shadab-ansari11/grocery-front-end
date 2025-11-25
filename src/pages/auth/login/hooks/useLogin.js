import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { login as loginAPI } from "../../../../services/auth.service";
import { setUserCredential } from "../../../../redux/authSlice";

const useLogin = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: loginAPI,
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

        toast.success("Login successful!");
        return response;
      } else {
        toast.error("Invalid credentials.");
        return null;
      }
    },
    onError: (err) => {
      console.error("Login error:", err);
      toast.error(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    },
  });

  const tryLogin = async (values) => {
    return mutation.mutateAsync(values);
  };

  return {
    tryLogin,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export { useLogin };
export default useLogin;
