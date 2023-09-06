import { Button, Card, Form } from "react-bootstrap";
import "./Contact.css";
import { useFormik } from "formik";
import { contactSchema } from "./schema";
import MySpinner from "../../components/spinner/Spinner";

type ContactFormTypes = {
  name: string;
  email: string;
  organization: string;
  message: string;
};

// TODO: Actually handle submit
const onSubmit = async (values: ContactFormTypes, actions: any) => {
  console.log("submitted form, values: ", values);
  console.log(values);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const Contact = () => {
  // Good formik tutorial - https://www.youtube.com/watch?v=7Ophfq0lEAY
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      organization: "",
      message: "",
    },
    onSubmit,
    validationSchema: contactSchema,
  });

  return (
    <div className="my-contact">
      <div className="my-contact-container set-max-width-container-with-padding-contact">
        <h1 className="center-align">Contact Us</h1>
        <br />

        <Card>
          <Card.Header>
            <Card.Title>Contact Form</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.name && errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.email && errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  name="organization"
                  type="text"
                  placeholder="Enter organization name"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  isInvalid={touched.organization && !!errors.organization}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.organization && errors.organization}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  name="message"
                  as="textarea"
                  rows={8}
                  placeholder="Please provide details about your organization and how we can help you."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  isInvalid={touched.message && !!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {touched.message && errors.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="align-card-btn-center">
              <Button disabled={isSubmitting} onClick={() => handleSubmit()}>
                {isSubmitting ? <MySpinner /> : "Submit"}
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
