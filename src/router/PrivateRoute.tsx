import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

type PrivateRouteProps = {
  // reason why need any below: https://stackoverflow.com/questions/55129942/typescript-styled-component-error-type-children-string-has-no-properti
  component: React.FC<any>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = (
  props: PrivateRouteProps
) => {
  const auth = useAuth();

  let Component = props.component;
  return auth?.user ? <Component {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
