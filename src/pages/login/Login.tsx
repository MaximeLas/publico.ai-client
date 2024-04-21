import { isSignInWithEmailLink } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Fade, Form } from "react-bootstrap";
import ProgressIllustration from "../../assets/login/progress_illustration.svg";
import SignUpIllustration from "../../assets/login/sign_up_illustration.svg";
import FullPageLoader from "../../components/fullPageLoader/FullPageLoader";
import GoogleSignInButton from "../../components/googleSigninButton/GoogleSignInButton";
import { auth } from "../../firebase";
import useOnLoginSubmit from "../../hooks/FormHandlers/useOnLoginSubmit";
import useLoginRedirect from "../../hooks/helpers/useLoginRedirect";
import useStore from "../../hooks/state/useStore";
import { LoginInfo } from "../../types/Auth";
import styles from "./Login.module.scss";
import { loginSchema } from "./schema";

function Login() {
  const isAuthSubmitting = useStore((state) => state.isAuthSubmitting);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const [sentLoginLink, setSentLoginLink] = useState(false);
  const isLoading = useLoginRedirect();
  const [isEmailVerifyPage] = useState(
    isSignInWithEmailLink(auth, window.location.href) &&
      !localStorage.getItem("emailForSignIn")
  );
  const onLoginSubmit = useOnLoginSubmit(isEmailVerifyPage);

  const onSubmit = async (info: LoginInfo) => {
    if (!info.email) return;
    await onLoginSubmit(info);
    if (!isEmailVerifyPage) {
      setSentLoginLink(true);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting: isFormSubmitting,
  } = useFormik<LoginInfo>({
    initialValues: {
      email: "",
    },
    onSubmit,
    validationSchema: loginSchema,
  });

  if (isLoading || !isAuthInitialized) {
    return <FullPageLoader />;
  }

  const isSubmitting = isFormSubmitting || isAuthSubmitting;

  const [formLabel, heroAlt, heroImage] = isEmailVerifyPage
    ? [
        "Please provide your email for confirmation",
        "Progress illustration",
        ProgressIllustration,
      ]
    : ["Email", "Sign-up illustration", SignUpIllustration];

  return (
    <Fade appear in>
      <div className={styles.root}>
        <div className={styles.formContainer}>
          <h1 className="text-center px-2">Welcome back!</h1>
          <p className="text-center px-2">
            You're one step closer to writing your next grant.
          </p>
          {sentLoginLink ? (
            <Fade appear in>
              <div className="text-center d-flex justify-content-center align-items-center">
                <p>
                  A Sign-In link has been sent to the address: {values.email} .{" "}
                  <br />
                  Please check your email to continue.
                </p>
              </div>
            </Fade>
          ) : (
            <Fade appear in>
              <Form onSubmit={handleSubmit} className={styles.form}>
                <Form.Group>
                  <Form.Label>{formLabel}</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isInvalid={!!touched.email && !!errors.email}
                    isValid={!!touched.email && !errors.email}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                  {errors.email && touched.email && (
                    <Form.Text className="text-danger">
                      {errors.email}
                    </Form.Text>
                  )}
                  <Button
                    className="mt-3 w-100"
                    disabled={isSubmitting}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <div className="mt-2">
                    <GoogleSignInButton disabled={isSubmitting} fullWidth />
                  </div>
                </Form.Group>
              </Form>
            </Fade>
          )}
        </div>
        <div className={styles.hero}>
          <img height="100%" width="100%" src={heroImage} alt={heroAlt} />
        </div>
      </div>
    </Fade>
  );
}

export default Login;
