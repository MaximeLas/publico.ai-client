import { Button, Card, Form } from "react-bootstrap";
import MySpinner from "../../components/spinner/MySpinner";
import { useFormik } from "formik";
import "./TryIt.css";
import { signUpSchema } from "./schema";
import useAuth from "../../auth/useAuth";
import { SignupInfo } from "../../auth/auth";

const TryIt: React.FC = () => {
  const auth = useAuth();

  const onSubmit = async (values: SignupInfo, actions: any) => {
    console.log("submitted form: ", values);

    const loginInfo = { email: values.email };
    await auth?.login(loginInfo);
    actions.resetForm();
  };

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
      email: "",
      name: "",
      acceptedTnC: false,
    },
    onSubmit,
    validationSchema: signUpSchema,
  });

  return (
    <div className="add-footer-padding-bottom">
      <div className="try-it-container">
        <h1 className="center-align">Try it today!</h1>
        <br></br>
        <p className="center-align">
          See how Publico's grantwriting coach can save your team time.
        </p>

        <Card>
          <Card.Header>
            <Card.Title>Sign Up</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter your name"
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
              <br />
              <Form.Group className="mb-3 form-group">
                <Form.Check
                  name="acceptedTnC"
                  required
                  label="I accept the Terms and Conditions."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.acceptedTnC && !!errors.acceptedTnC}
                  feedback="You must accept the Terms and Conditions to create an account."
                  feedbackType="invalid"
                />
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="align-card-btn-center">
              <Button
                variant="dark"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              >
                {isSubmitting ? <MySpinner /> : "Sign up!"}
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default TryIt;
