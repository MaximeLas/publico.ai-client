import * as yup from "yup";

// minimum 10 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter an email."),
  password: yup
    .string()
    .min(10)
    .matches(passwordRules, {
      message:
        "Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
    })
    .required("Please enter a password."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match.")
    .required("Please re-enter your password."),
});

export { loginSchema };
