import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../../../constants/errorMessages";

const defaultValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  paymentMethod: "card",
};

const schema = Yup.object().shape({
  fullName: Yup.string().required(ErrorMessages.checkout.fullName),
  email: Yup.string()
    .email("Invalid email format")
    .required(ErrorMessages.checkout.email),
  phone: Yup.string().required(ErrorMessages.checkout.phone),
  address: Yup.string().required(ErrorMessages.checkout.address),
  city: Yup.string().required(ErrorMessages.checkout.city),
  zipCode: Yup.string().required(ErrorMessages.checkout.zipCode),
});

const useCheckoutForm = (onSubmit, initialValues = defaultValues) => {
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

export default useCheckoutForm;
