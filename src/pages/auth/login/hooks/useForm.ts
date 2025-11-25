import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessages from "../../../../constants/errorMessages";

const defaultValues = {
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .matches(/@[^.]*\./, "Email must contain @ and domain")
    .required(ErrorMessages.login.email),
  password: Yup.string().required(ErrorMessages.login.password),
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
