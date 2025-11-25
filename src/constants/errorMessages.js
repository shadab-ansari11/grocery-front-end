const ErrorMessages = {
  login: {
    email: "Valid email is required",
    password: "Password is required",
  },
  register: {
    name: "Name is required",
    email: "Valid email is required",
    password: "Password must be at least 6 characters",
    confirmPassword: "Passwords must match",
  },
  checkout: {
    fullName: "Full name is required",
    email: "Valid email is required",
    phone: "Phone number is required",
    address: "Address is required",
    city: "City is required",
    zipCode: "Zip code is required",
  },
};

export default ErrorMessages;
