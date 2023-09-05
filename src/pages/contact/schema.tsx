import * as yup from "yup";

const contactSchema = yup.object().shape({
  name: yup.string().required("Please enter your name."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter an email."),
  organization: yup.string().required("Please enter your organization's name."),
  message: yup.string().required("Please enter details about your inquiry."),
});

export { contactSchema };
