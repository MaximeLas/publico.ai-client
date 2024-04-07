import { Navigate } from "react-router-dom";
import useStore from "../hooks/state/useStore";
import FullPageLoader from "../components/fullPageLoader/FullPageLoader";

type PrivateRouteProps = {
  // reason why need any below: https://stackoverflow.com/questions/55129942/typescript-styled-component-error-type-children-string-has-no-properti
  component: React.FC<any>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = (
  props: PrivateRouteProps
) => {
  const user = useStore((state) => state.user);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);

  if (!isAuthInitialized) {
    return <FullPageLoader />;
  }

  let Component = props.component;
  return user ? <Component {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
