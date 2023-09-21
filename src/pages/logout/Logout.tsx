import { logout } from "../../utilities/account";

const Logout = () => {
  logout();
  window.location.href = "/";

  return <></>;
};

export default Logout;
