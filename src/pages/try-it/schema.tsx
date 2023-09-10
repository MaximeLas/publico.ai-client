import * as yup from "yup";

const ORG_TYPES = ["Nonprofit", "Research", "Other social enterprise", "Other"];

// TODO: Use the below when adding a Sign Up form
// minimum 10 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter an email."),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters.")
    .matches(passwordRules, {
      message:
        "Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
    })
    .required("Please enter a password."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match."),
  organization: yup.string().required("Please enter your organization's name."),
  organizationSize: yup
    .number()
    .positive("Please enter a number greater than 0.")
    .integer("Please enter an integer value.")
    .required("Please enter your organization's estimated size."),
  organizationType: yup.string().oneOf(ORG_TYPES),
});

export { signUpSchema, ORG_TYPES };
