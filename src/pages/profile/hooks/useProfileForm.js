import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .nullable(),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .nullable(),
  city: Yup.string()
    .min(2, "City name must be at least 2 characters")
    .nullable(),
  state: Yup.string()
    .min(2, "State name must be at least 2 characters")
    .nullable(),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
    .nullable(),
});

const useProfileForm = (initialValues, onSubmit) => {
  return useFormik({
    initialValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      address: initialValues?.address || "",
      city: initialValues?.city || "",
      state: initialValues?.state || "",
      pincode: initialValues?.pincode || "",
      avatar: initialValues?.avatar || "",
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
  });
};

export default useProfileForm;
