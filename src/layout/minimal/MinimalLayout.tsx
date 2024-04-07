import { Link, Outlet } from "react-router-dom";
import { StoreContextProvider } from "../../context/Store";
import Logo from "../../components/logo/Logo";
import styles from "./MinimalLayout.module.scss";

function MinimalLayout() {
  return (
    <StoreContextProvider>
      <div className="vh-100 vw-100 bg-light d-flex flex-column border border-5 border-primary">
        <Link to="/" className="p-3">
          <Logo />
        </Link>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </StoreContextProvider>
  );
}

export default MinimalLayout;
