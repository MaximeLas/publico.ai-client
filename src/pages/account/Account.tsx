import useAuth from "../../auth/useAuth";

const Account: React.FC = () => {
  const auth = useAuth();

  return (
    <div>
      <p>My Account</p>
      Current user: {auth?.user}
    </div>
  );
};

export default Account;
