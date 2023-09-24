import { Button, Card, Form } from "react-bootstrap";
import "./Login.css";
import { useFormik } from "formik";
import { loginSchema } from "./schema";
import MySpinner from "../../components/spinner/MySpinner";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { LoginInfo } from "../../auth/auth";

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginInfo, actions: any) => {
    console.log("submitted form: ", values);
    console.log(auth);

    await auth?.login(values);
    actions.resetForm();
    navigate("/dashboard");
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
      password: "",
    },
    onSubmit,
    validationSchema: loginSchema,
  });

  return (
    <div className="my-login-container">
      <h1 className="center-align">Welcome back!</h1>
      <br></br>
      <p className="center-align">
        You're one step closer to writing your next grant.
      </p>

      <Card>
        <Card.Header>
          <Card.Title>Log In</Card.Title>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {touched.password && errors.password}
              </Form.Control.Feedback>
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
              {isSubmitting ? <MySpinner /> : "Log In"}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Login;
