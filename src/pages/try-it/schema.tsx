import * as yup from "yup";

const ORG_TYPES = ["Nonprofit", "Research", "Other social enterprise", "Other"];
const ORG_SIZES = ["1-5", "5-25", "25-100", "100+"];

// TODO: Use the below when adding a Sign Up form
// minimum 10 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter an email."),
  name: yup.string().required("Please enter your first and last name."),
  acceptedTnC: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
});

export { signUpSchema, ORG_TYPES, ORG_SIZES };
