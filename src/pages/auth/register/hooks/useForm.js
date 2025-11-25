import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../../../../constants/errorMessages";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const schema = Yup.object().shape({
  name: Yup.string().required(ErrorMessages.register.name),
  email: Yup.string()
    .email("Invalid email format")
    .matches(/@[^.]*\./, "Email must contain @ and domain")
    .required(ErrorMessages.register.email),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required(ErrorMessages.register.password),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(ErrorMessages.register.confirmPassword),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  city: Yup.string()
    .min(2, "City name must be at least 2 characters")
    .required("City is required"),
  state: Yup.string()
    .min(2, "State name must be at least 2 characters")
    .required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),
});

const useForm = (onSubmit, initialValues = defaultValues) => {
  return useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};

export default useForm;
