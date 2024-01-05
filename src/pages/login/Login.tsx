import { Button, Card, Form } from "react-bootstrap";
import "./Login.css";
import { useFormik } from "formik";
import { loginSchema } from "./schema";
import MySpinner from "../../components/spinner/MySpinner";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { LoginInfo } from "../../auth/auth";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect } from "react";

const Login: React.FC = () => {
  const auth = useAuth();
  const firebaseAuth = getAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth?.user){
      // user is already signed in
      navigate('/dashboard');
    }
    else {
      if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
        console.log("Reached here");
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = localStorage.getItem('emailForSignIn');
        console.log(email);
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        if (email) {
          signInWithEmailLink(firebaseAuth, email, window.location.href)
            .then((result) => {
              // Clear email from storage.
              localStorage.removeItem('emailForSignIn');
              // You can access the new user via result.user
              // Additional user info profile not available via:
              // result.additionalUserInfo.profile == null
              // You can check if the user is new or existing:
              // result.additionalUserInfo.isNewUser
              auth?.setCurrentUser(result.user.uid);
              navigate("/dashboard");
            })
            .catch((error) => {
              // Some error occurred, you can inspect the code: error.code
              // Common errors could be invalid email and invalid or expired OTPs.
            });
        }
      }
    }
  });
  const onSubmit = async (values: LoginInfo, actions: any) => {
    console.log("submitted form: ", values);
    console.log(auth);

    await auth?.login(values);
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
