import useStore from '../../hooks/state/useStore';

const Account: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <p>My Account</p>
      Current user: {user?.displayName}
    </div>
  );
};

export default Account;
