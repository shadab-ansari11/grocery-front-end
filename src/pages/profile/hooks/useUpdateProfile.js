import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { updateProfile as updateProfileAPI } from '../../../services/auth.service';
// import { setUserCredential } from '../../../redux/authSlice';

const useUpdateProfile = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (profileData) => {
      // TODO: Replace with actual API call when backend is ready
      // const response = await updateProfileAPI(profileData);
      // return response;

      // Simulated API call for now
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, user: profileData });
        }, 1000);
      });
    },
    onSuccess: (response, variables) => {
      if (response.success) {
        // TODO: Update Redux store when API is ready
        // dispatch(setUserCredential({
        //   userInfo: response.user,
        //   token: localStorage.getItem('token'),
        // }));

        // Update localStorage
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = { ...currentUser, ...variables };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Profile updated successfully!");
        return response;
      } else {
        toast.error("Failed to update profile");
        return null;
      }
    },
    onError: (err) => {
      console.error("Profile update error:", err);
      toast.error(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    },
  });

  const updateProfile = async (values) => {
    return mutation.mutateAsync(values);
  };

  return {
    updateProfile,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export default useUpdateProfile;
