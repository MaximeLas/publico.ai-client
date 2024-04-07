import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./MainLayout.module.css";
import { StoreContextProvider } from "../../context/Store";
import { DBContextProvider } from "../../context/DB";

function MainLayout() {
  return (
    <DBContextProvider>
      <StoreContextProvider>
        <div className="min-vh-100 overflow-hidden position-relative bg-light flex-no-wrap border border-5 border-primary">
          <Header />
          {/* For more info about Outlet from react-router-dom, check out
        https://www.youtube.com/watch?v=Ul3y1LXxzdU at 20m 48s */}
          <div className={styles.content}>
            <Outlet />
          </div>
          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Publico.ai © {new Date().getFullYear()}
            </p>
          </footer>
          {/* <Footer /> */}
        </div>
      </StoreContextProvider>
    </DBContextProvider>
  );
}

export default MainLayout;
