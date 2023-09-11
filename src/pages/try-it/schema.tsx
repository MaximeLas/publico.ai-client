import * as yup from "yup";

const ORG_TYPES = ["Nonprofit", "Research", "Other social enterprise", "Other"];
const ORG_SIZES = ["1-5", "5-25", "25-100", "100+"];

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
  name: yup.string().required("Please enter your first and last name."),
  organization: yup.string().required("Please enter your organization's name."),
  organizationSize: yup
    .string()
    .oneOf(ORG_SIZES, "Please select a valid size."),
  organizationType: yup
    .string()
    .oneOf(ORG_TYPES, "Please select a valid type of organization."),
  acceptedTnC: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
});

export { signUpSchema, ORG_TYPES, ORG_SIZES };
