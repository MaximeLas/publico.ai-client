import { Card, Form } from "react-bootstrap";
import "./Login.css";
import { useFormik } from "formik";

type Values = {
  email: string;
  password: string;
};

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
  });

  return (
    <div className="my-login">
      <div className="my-login-container set-max-width-container-with-padding">
        <h1 className="white-text center-align">Welcome back!</h1>
        <br></br>
        <p className="white-text center-align">We're always here for you.</p>
        <br></br>

        <Card>
          <Card.Header>
            <Card.Title>Log In</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3 form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
