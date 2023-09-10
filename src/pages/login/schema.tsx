import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter an email."),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters.")
    .required("Please enter a password."),
});

export { loginSchema };
