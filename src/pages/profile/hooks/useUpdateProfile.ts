import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import { updateProfile as updateProfileAPI } from '../../../services/auth.service';
// import { setUserCredential } from '../../../redux/authSlice';

interface UpdateProfileResponse {
  success: boolean;
  user?: any;
  message?: string;
}

const useUpdateProfile = () => {

  const mutation = useMutation({
    mutationFn: async (profileData: any): Promise<UpdateProfileResponse> => {
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
    onSuccess: (response: UpdateProfileResponse, variables: any) => {
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
    onError: (err: any) => {
      console.error("Profile update error:", err);
      toast.error(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    },
  });

  const updateProfile = async (values: any) => {
    return mutation.mutateAsync(values);
  };

  return {
    updateProfile,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

export default useUpdateProfile;
