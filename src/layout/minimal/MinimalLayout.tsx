import { Link, Outlet } from "react-router-dom";
import { StoreContextProvider } from "../../context/Store";
import Logo from "../../components/logo/Logo";
import styles from "./MinimalLayout.module.scss";
import Footer from "../../components/footer/Footer";
import clsx from "clsx";
import { ErrorBoundary } from "react-error-boundary";

function MinimalLayout() {
  const className = clsx(
    styles.root,
    "border border-5 border-primary"
  );
  return (
    <StoreContextProvider>
      <ErrorBoundary fallback={<div>oops</div>}>
      <div className={className}>
        <div className="pt-3 ps-3 w-100">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
      </ErrorBoundary>
    </StoreContextProvider>
  );
}

export default MinimalLayout;
